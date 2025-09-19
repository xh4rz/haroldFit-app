import { colors } from './constants/colors';

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
				primary: colors.primary,
				secondary: colors.secondary,

				'bg-light': colors.light.background,
				'bg-dark': colors.dark.background,

				'bg-card-light': colors.light.backgroundCard,
				'bg-card-dark': colors.dark.backgroundCard,

				'text-primary-light': colors.light.textPrimary,
				'text-primary-dark': colors.dark.textPrimary,

				'text-secondary-light': colors.light.textSecondary,
				'text-secondary-dark': colors.dark.textSecondary
			}
		}
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.bg-theme': {
					'@apply bg-bg-light dark:bg-bg-dark': {}
				},
				'.bg-card-theme': {
					'@apply bg-bg-card-light dark:bg-bg-card-dark': {}
				},
				'.text-primary-theme': {
					'@apply text-text-primary-light dark:text-text-primary-dark': {}
				},
				'.text-secondary-theme': {
					'@apply text-text-secondary-light dark:text-text-secondary-dark': {}
				}
			});
		}
	]
};
