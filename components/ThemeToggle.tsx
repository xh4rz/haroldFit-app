import React from 'react';
import { Switch, View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

import { Feather } from '@expo/vector-icons';

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<View className="flex-row items-center space-x-3">
			<Text className={`text-base font-medium text-primary-theme`}>
				<Feather
					name="sun"
					size={20}
					color={theme === 'dark' ? '#6b7280' : 'white'}
				/>
			</Text>
			<Switch
				value={theme === 'dark'}
				onValueChange={toggleTheme}
				trackColor={{ false: '#6b7280', true: '#9333ea' }}
				thumbColor={theme === 'dark' ? '#9333ea' : '#f4f3f4'}
				ios_backgroundColor="#6b7280"
			/>
			<Text className={`text-base font-medium text-primary-theme`}>
				<Feather
					name="moon"
					size={20}
					color={theme === 'dark' ? 'white' : '#6b7280'}
				/>
			</Text>
		</View>
	);
};
