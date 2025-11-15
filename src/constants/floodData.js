// Physical constants
export const G_CONSTANT = 9.81;
export const Z_BED = 1.497;
export const DELTA_X = 500.0;
export const NUM_STEPS = 14;

// Raw data from hydrological measurements (Table 1)
export const RAW_DATA = {
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
  2568: { 
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
  { label: 'ปี 2565', value: 2565 },
  { label: 'ปี 2566', value: 2566 },
  { label: 'ปี 2567', value: 2567 },
  { label: 'ปี 2568', value: 2568 },
];

export const RIVERBANK_OPTIONS = [
  { label: '1.5 เมตร', value: 1.5 },
  { label: '2.0 เมตร', value: 2.0 },
  { label: '2.5 เมตร', value: 2.5 },
  { label: '3.0 เมตร', value: 3.0 },
  { label: '3.5 เมตร', value: 3.5 },
  { label: '4.0 เมตร', value: 4.0 },
  { label: '4.5 เมตร', value: 4.5 },
  { label: '5.0 เมตร', value: 5.0 },
  { label: '5.5 เมตร', value: 5.5 },
  { label: '6.0 เมตร', value: 6.0 },
  { label: '6.5 เมตร', value: 6.5 },
  { label: '7.0 เมตร', value: 7.0 },
  { label: '7.5 เมตร', value: 7.5 },
  { label: '8.0 เมตร', value: 8.0 },
  { label: '8.5 เมตร', value: 8.5 },
  { label: '9.0 เมตร', value: 9.0 },
  { label: '9.5 เมตร', value: 9.5 },
  { label: '10.0 เมตร', value: 10.0 },
  { label: '10.5 เมตร', value: 10.5 },
  { label: '11.0 เมตร', value: 11.0 },
  { label: '11.5 เมตร', value: 11.5 },
  { label: '12.0 เมตร', value: 12.0 },
  { label: '12.5 เมตร', value: 12.5 },
  { label: '13.0 เมตร', value: 13.0 },
  { label: '13.5 เมตร', value: 13.5 },
  { label: '14.0 เมตร', value: 14.0 },
  { label: '14.5 เมตร', value: 14.5 },
  { label: '15.0 เมตร', value: 15.0 },
  { label: '15.5 เมตร', value: 15.5 },
  { label: '16.0 เมตร', value: 16.0 },
  { label: '16.5 เมตร', value: 16.5 },
  { label: '17.0 เมตร', value: 17.0 },
  { label: '17.5 เมตร', value: 17.5 },
  { label: '18.0 เมตร', value: 18.0 },
  { label: '18.5 เมตร', value: 18.5 },
  { label: '19.0 เมตร', value: 19.0 },
  { label: '19.5 เมตร', value: 19.5 },
  { label: '20.0 เมตร', value: 20.0 },
];
