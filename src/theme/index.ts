export const theme = {
  colors: {
    primary: '#FCD12A', // Amarelo Vibrante (Ação/Destaque)
    primaryLight: '#FFE163',
    primaryDark: '#C7A200',

    secondary: '#002366', // Azul Marinho (Background/Cards)

    background: '#002366', // Azul Marinho Profundo
    surface: '#003A8C', // Azul um pouco mais claro para inputs/cards

    text: '#FFFFFF', // Texto branco sobre fundo azul
    textDark: '#1A202C', // Texto escuro sobre fundo amarelo
    textSecondary: '#A0AEC0', // Cinza azulado para textos menos importantes

    error: '#FC8181',
    success: '#68D391',

    border: '#003A8C', // Borda discreta azul
    star: '#FFD700', // Dourado das estrelas
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
    lg: 16,
    full: 999,
  },
  typography: {
    h1: {
      fontSize: 32,
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
