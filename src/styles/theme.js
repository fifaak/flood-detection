export const colors = {
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  primaryLight: '#38BDF8',
  secondary: '#8B5CF6',
  success: '#10B981',
  successLight: '#D1FAE5',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  warning: '#F59E0B',
  background: '#F8FAFC',
  backgroundDark: '#F1F5F9',
  white: '#FFFFFF',
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    light: '#94A3B8',
  },
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  shadow: '#000000',
  gradient: {
    start: '#0EA5E9',
    end: '#8B5CF6',
  },
};

export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
  xxl: 30,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 48,
};

export const fontWeight = {
  normal: 'normal',
  medium: '600',
  bold: 'bold',
};

export const shadows = {
  small: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  medium: {
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  large: {
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
};

export const animations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};
