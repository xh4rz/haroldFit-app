import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

export type ThemeName = 'light' | 'dark';

interface ThemeContextType {
	theme: ThemeName;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export function ThemeContextProvider({ children }: { children: ReactNode }) {
	const { setColorScheme } = useColorScheme();
	const [theme, setTheme] = useState<ThemeName>('light');

	useEffect(() => {
		loadSavedTheme();
	}, []);

	useEffect(() => {
		setColorScheme(theme);
	}, [theme, setColorScheme]);

	const loadSavedTheme = async () => {
		try {
			const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
			if (savedTheme === 'light' || savedTheme === 'dark') {
				setTheme(savedTheme);
			}
		} catch (error) {
			console.error('Error loading theme:', error);
		} finally {
		}
	};

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
	};

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
