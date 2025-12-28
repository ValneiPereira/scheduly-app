export const theme = {
  colors: {
    primary: '#FED31A', // Bright Yellow (Brand)
    primaryLight: '#FFE163',
    primaryDark: '#C7A200',

    secondary: '#FFFFFF', // White for secondary actions/text

    background: '#002D72', // Deep Navy Blue
    surface: '#003A8C', // Lighter Navy for cards/inputs

    text: '#FFFFFF', // White text for blue background
    textDark: '#1A202C', // Dark text for yellow background
    textSecondary: '#A0AEC0', // Gray 400

    error: '#FC8181', // Lighter Red for dark background
    success: '#68D391', // Lighter Green for dark background

    border: '#2D3748', // Dark border
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
