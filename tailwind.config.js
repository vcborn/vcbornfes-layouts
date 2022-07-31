/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#163469",
			},
			fontFamily: {
				sans: ["Noto Sans JP", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
