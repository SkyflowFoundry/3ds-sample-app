import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app

const theme = createMuiTheme({
  palette: {
    grey: {
      0: "#fbfbfd",
      1: "#696969",
      2: "#979da9",
      100: "#f5f8fa",
      200: "#eaf0f6",
      300: "#dfe3eb",
      400: "#cbd6e2",
      500: "#99acc2",
      600: "#7c98b6",
      700: "#516f90",
      800: "#425b76",
      900: "#2d3e50",
    },
    black: {
      0: "#1d1d1d",
      1: "#344563",
    },
    blue: {
      0: "#1665d8",
    },
    royalBlue: {
      0: "#4169E1",
    },
    white: {
      0: "#ffffff",
    },
    lightBlue: {
      0: "#eaedf3",
    },
    skyBlue: {
      0: "#549af0",
    },
    green: {
      0: "#39b54a",
    },
    current: {
      0: "#4169E1",
    },
    completed: {
      0: "#1d1d1d",
    },
    pending: {
      0: "#696969",
    },
    // error: {
    // },
    background: {
      default: "#fff",
    },
    primary: {
      main: "#4169e1",
    },
    text: {
      primary: "#344563",
      secondary: "#5e6c84",
    },
    // text : {
    //add primary secondary etc here
    // },
    // action : {
    //add hover,disabled etc here
    // },
    // status: {
    //your own business colors
    //   },
  },
  spacing: 4,
  shadows: [
    "none",
    "0 2px 25px 5px rgba(0, 0, 0, 0.04)",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  typography: {
    fontFamily: "Roboto",
    //add variants here
    h1: {
      fontSize: "36px",
      fontWeight: 500,
      fontStyle: "normal",
      lineHeight: "1.39",
      letterSpacing: "normal",
    },
    h2: {
      fontSize: "26px",
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    h3: {
      fontSize: "23px",
      fontStyle: "normal",
      lineHeight: "1.39",
      letterSpacing: "normal",
    },
    h5: {
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "1.56",
      letterSpacing: "normal",
    },
    h6: {
      fontSize: "14px",
      fontStyle: "normal",
      lineHeight: "1.43",
      letterSpacing: "normal",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "bold",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    body2: {
      fontSize: "14px",
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: "21px",
      letterSpacing: "normal",
    },
    caption: {
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "1.5",
      letterSpacing: "normal",
    },
  },
  overrides: {
    //Add global css here
    MuiButton: {
      root: {
        textTransform: "capitalize",
        "&.MuiButton-contained.Mui-disabled": {
          color: "#fff",
          backgroundColor: "#c6d2f6",
        },
        minHeight: "38px",
      },
    },
  },
});

export const extraColors = {
  yellow: "#FDEAB6",
};

export default theme;
