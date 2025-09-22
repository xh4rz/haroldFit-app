import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

export type ThemeName = 'light' | 'dark';

interface ThemeContextType {
	theme: ThemeName;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export function ThemeContextProvider({ children }: { children: ReactNode }) {
	const systemTheme: ColorSchemeName = Appearance.getColorScheme();
	const { setColorScheme } = useColorScheme();
	const [theme, setTheme] = useState<ThemeName>(
		systemTheme === 'dark' ? 'dark' : 'light'
	);

	useEffect(() => {
		loadSavedTheme();
	}, []);

	const updateTheme = (newTheme: ThemeName) => {
		setTheme(newTheme);
		setColorScheme(newTheme);
	};

	const loadSavedTheme = async () => {
		try {
			const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

			if (savedTheme === 'light' || savedTheme === 'dark') {
				updateTheme(savedTheme);
			} else {
				// No hay tema guardado, usar el del sistema
				const systemTheme = Appearance.getColorScheme();
				updateTheme(systemTheme === 'dark' ? 'dark' : 'light');
			}
		} catch {
			// En caso de error, usar tema del sistema
			const systemTheme = Appearance.getColorScheme();
			updateTheme(systemTheme === 'dark' ? 'dark' : 'light');
		}
	};

	const toggleTheme = async () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
		updateTheme(newTheme);
	};

	useEffect(() => {
		const listener = Appearance.addChangeListener(({ colorScheme }) => {
			if (colorScheme === 'dark' || colorScheme === 'light') {
				updateTheme(colorScheme);
			}
		});

		return () => listener.remove();
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<StatusBar style={theme === 'light' ? 'dark' : 'light'} />
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
