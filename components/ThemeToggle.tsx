import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<TouchableOpacity
			className={`px-4 py-2 rounded-lg items-center ${
				theme === 'dark' ? 'bg-black' : 'bg-white'
			}`}
			onPress={toggleTheme}
		>
			<Text
				className={`text-base font-medium ${
					theme === 'dark' ? 'text-white' : 'text-black'
				}`}
			>
				{theme === 'light' ? '🌙 Dark' : '☀️ Light'}
			</Text>
		</TouchableOpacity>
	);
};
