/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Lexend",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Noto Sans",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"Noto Color Emoji",
				],
				serif: [
					"Lexend",
					"ui-serif",
					"Georgia",
					"Cambria",
					"Times New Roman",
					"Times",
					"serif",
				],
			},
			colors: {
				primary: {
					DEFAULT: "#3F2314",
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
				},
				secondary: {
					DEFAULT: "#f69800",
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
				},
				background: {
					DEFAULT: "#E6E8F1",
					light: "#FFFFFF",
					dark: "#F1F5F9",
				},
			},
		},
		screens: {
			xs: "375px",
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
	important: true,
};
