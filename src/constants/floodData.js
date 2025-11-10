// Physical constants
export const G_CONSTANT = 9.81;
export const Z_BED = 1.497;
export const DELTA_X = 500.0;
export const NUM_STEPS = 14;

// Raw data from hydrological measurements (Table 1)
export const RAW_DATA = {
  2564: { 
    S_0: 0.02253, 
    n: 0.04, 
    Q: 255.542, 
    A: 1295.25, 
    R: 8.659, 
    v: 0.197, 
    y_0: 0.3 
  },
  2565: { 
    S_0: 0.02317, 
    n: 0.04, 
    Q: 481.249, 
    A: 1278.75, 
    R: 8.548, 
    v: 0.371, 
    y_0: 0.3 
  },
  2566: { 
    S_0: 0.01977, 
    n: 0.04, 
    Q: 181.603, 
    A: 1359.66, 
    R: 9.089, 
    v: 0.140, 
    y_0: 0.3 
  },
  2567: { 
    S_0: 0.02107, 
    n: 0.04, 
    Q: 258.136, 
    A: 1317.50, 
    R: 8.807, 
    v: 0.199, 
    y_0: 0.3 
  },
};

// Dropdown options
export const YEAR_OPTIONS = [
  { label: 'ปี 2564', value: 2564 },
  { label: 'ปี 2565', value: 2565 },
  { label: 'ปี 2566', value: 2566 },
  { label: 'ปี 2567', value: 2567 },
];

export const RIVERBANK_OPTIONS = [
  { label: '1.5 เมตร', value: 1.5 },
  { label: '2.0 เมตร', value: 2.0 },
  { label: '2.5 เมตร', value: 2.5 },
  { label: '3.0 เมตร', value: 3.0 },
];
