// theme.ts
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul padrão do Material-UI
    },
    secondary: {
      main: "#d32f2f", // vermelho escuro
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 600,
      color: "#333",
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      color: "#666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: "bold",
        },
        containedPrimary: {
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

