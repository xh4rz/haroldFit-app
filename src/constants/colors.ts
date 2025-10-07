export const colors = {
	// Colores principales
	primary: '#ffa500',
	secondary: '#9333ea',

	// Colores de tema claro
	light: {
		background: '#f4f4f5',
		backgroundCard: '#ffffff',
		textPrimary: '#000000',
		textSecondary: '#666666'
	},

	// Colores de tema oscuro
	dark: {
		background: 'black',
		backgroundCard: '#27272a',
		textPrimary: '#ffffff',
		textSecondary: '#cccccc'
	}
} as const;

// Tipos para TypeScript
export type ColorKeys = keyof typeof colors;
