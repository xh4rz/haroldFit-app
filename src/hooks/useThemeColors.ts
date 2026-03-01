// src/hooks/useThemeColors.ts
import { useColorScheme } from 'nativewind';
import { colors } from '@/constants/colors';

export const useThemeColors = () => {
	const { colorScheme } = useColorScheme();
	return colorScheme === 'dark' ? colors.dark : colors.light;
};
