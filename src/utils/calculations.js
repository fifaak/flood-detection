/**
 * Calculate friction slope (Sf) using Manning's equation
 * @param {number} n - Manning's roughness coefficient
 * @param {number} Q - Flow discharge
 * @param {number} A - Cross-sectional area
 * @param {number} R - Hydraulic radius
 * @returns {number} Friction slope
 */
export const calculateSf = (n, Q, A, R) => {
  if (A === 0 || R === 0) return 0;
  const term = (n * Q) / (A * Math.pow(R, 2/3));
  return Math.pow(term, 2);
};

/**
 * Calculate Froude number
 * @param {number} v - Flow velocity
 * @param {number} g - Gravitational acceleration
 * @param {number} y_0 - Initial water depth
 * @returns {number} Froude number
 */
export const calculateFr = (v, g, y_0) => {
  if (g === 0 || y_0 === 0) return 0;
  return v / Math.sqrt(g * y_0);
};

/**
 * Calculate water surface slope (dy/dx)
 * @param {number} S_0 - Bed slope
 * @param {number} S_f - Friction slope
 * @param {number} Fr - Froude number
 * @returns {number} Water surface slope
 */
export const calculateDyDx = (S_0, S_f, Fr) => {
  if ((1 - Math.pow(Fr, 2)) === 0) return 0;
  return (S_0 - S_f) / (1 - Math.pow(Fr, 2));
};

/**
 * Run Euler's method simulation for gradually varied flow
 * @param {number} dy_dx - Water surface slope
 * @param {number} y_initial - Initial water depth
 * @param {number} z_bed - Bed elevation
 * @param {number} delta_x - Distance step
 * @param {number} num_steps - Number of calculation steps
 * @returns {Object} Object containing depth and water level arrays
 */
export const runSimulation = (dy_dx, y_initial, z_bed, delta_x, num_steps) => {
  const y_depths = [y_initial];
  const W_levels = [y_initial + z_bed];
  let y_current = y_initial;
  
  for (let i = 1; i <= num_steps; i++) {
    const y_next = y_current + (dy_dx * delta_x);
    const W_next = y_next + z_bed;
    
    y_depths.push(y_next);
    W_levels.push(W_next);
    y_current = y_next;
  }
  
  return { y_depths, W_levels };
};

/**
 * Calculate complete flood prediction
 * @param {Object} rawData - Raw hydrological data
 * @param {number} g - Gravitational constant
 * @param {number} z_bed - Bed elevation
 * @param {number} delta_x - Distance step
 * @param {number} num_steps - Number of steps
 * @param {number} riverbankLevel - Riverbank elevation threshold
 * @returns {Object} Complete prediction results
 */
export const calculateFloodPrediction = (
  rawData, 
  g, 
  z_bed, 
  delta_x, 
  num_steps, 
  riverbankLevel
) => {
  // Calculate intermediate values
  const S_f = calculateSf(rawData.n, rawData.Q, rawData.A, rawData.R);
  const Fr = calculateFr(rawData.v, g, rawData.y_0);
  const dy_dx = calculateDyDx(rawData.S_0, S_f, Fr);
  
  // Run simulation
  const { y_depths, W_levels } = runSimulation(
    dy_dx,
    rawData.y_0,
    z_bed,
    delta_x,
    num_steps
  );
  
  // Calculate statistics (monthly average by dividing by 12)
  const W_average = (W_levels.slice(1).reduce((a, b) => a + b, 0) / num_steps) / 12;
  const maxLevel = Math.max(...W_levels) / 12;
  const isFlooding = W_average > riverbankLevel;
  
  return {
    W_levels,
    W_average,
    maxLevel,
    isFlooding,
  };
};
