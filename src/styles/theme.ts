import { createTheme } from "@mui/material";

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	typography: {
		fontFamily: "Lexend,  sans-serif",
		button: {
			textTransform: "unset",
		},
	},
	palette: {
		primary: {
			main: "#3F2314",
			light: "#52392c",
			dark: "#321c10",
			100: "#ece9e8",
			200: "#d9d3d0",
			300: "#b2a7a1",
			400: "#9f918a",
			500: "#8c7b72",
			600: "#79655b",
			700: "#392012",
			800: "#2c190e",
			900: "#20120a",
			contrastText: "#fff",
		},
		secondary: {
			main: "#f69800",
			light: "#fbcc80",
			dark: "#ac6a00",
			100: "#fdeacc",
			200: "#fce0b3",
			300: "#fbcc80",
			400: "#f8ad33",
			500: "#f7a21a",
			600: "#dd8900",
			700: "#ac6a00",
			800: "#7b4c00",
			900: "#4a2e00",
			contrastText: "#fff",
		},
		success: {
			light: "#9bd99b",
			main: "#5ec25e",
			dark: "#36b336",
			contrastText: "#fff",
		},
		warning: {
			light: "#f3b999",
			main: "#ed9666",
			dark: "#e15000",
			contrastText: "#fff",
		},
		error: {
			light: "#d0736e",
			main: "#c1453d",
			dark: "#b1160d",
			contrastText: "#fff",
		},
	},
});

export default theme;
