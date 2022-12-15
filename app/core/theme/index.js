import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';

function createEmotionCache() {
  return createCache({ key: 'css' });
}
const cache = createEmotionCache();

const Font = {
  primary: "Maison Neue 500, sans-serif",
}
const KellyTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },

    secondary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#ffffff",
      contrastText: "#000000",
    },

    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff",
    },

    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },

    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#fff",
    },

    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff"
    },

    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
    },


  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: Font.primary,
    h1: {
      fontFamily: Font.primary,
    },
    h2: {
      fontFamily: Font.primary,
    },
    h3: {
      fontFamily: Font.primary,
    },
    h4: {
      fontFamily: Font.primary,
    },
    h5: {
      fontFamily: Font.primary,
    },
    h6: {
      fontFamily: Font.primary,
    },
    body1: {
      fontFamily: Font.primary,
    }
  },

  components: {

    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            textTransform: "none",
            fontSize: "16px",
            minHeight: "48px",
            lineHeight: "48px",
            paddingBottom: "0px",
            minWidth: "48px",
            paddingTop: "0px",
            fontFamily: Font.primary,

            color: "#fff",

            "&:hover": {
              color: "#fff",
              boxShadow: "0px 0px 5px rgba(0,0,0,.25)",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },

  },
  button: {
    borderRadius: 0
  }
});

export {
  KellyTheme,
  cache
}