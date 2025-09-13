/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.tsx',
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./modules/**/*.{js,jsx,ts,tsx}'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				// Colores principales
				primary: '#ffa500',
				secondary: '#9333ea'
			}
		}
	},
	plugins: []
};
