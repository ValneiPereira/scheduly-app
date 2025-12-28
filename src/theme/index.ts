export const theme = {
  colors: {
    primary: '#D53F8C', // Pink 600
    primaryLight: '#ED64A6', // Pink 400
    primaryDark: '#B83280', // Pink 700
    
    secondary: '#805AD5', // Purple 600
    
    background: '#FFFFFF',
    surface: '#F7FAFC', // Gray 50
    
    text: '#2D3748', // Gray 800
    textSecondary: '#718096', // Gray 600
    
    error: '#E53E3E', // Red 600
    success: '#38A169', // Green 600
    
    border: '#E2E8F0', // Gray 200
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 999,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: '700',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
    }
  }
};

export type Theme = typeof theme;
