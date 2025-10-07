import { ThemeToggle } from '@/components/ThemeToggle';
import { Text, View } from 'react-native';

export default function ThemeScreen() {
	return (
		<View className="flex-1 bg-theme">
			<Text className="text-primary-theme my-2 mx-2">
				Cambiar tema del sistema
			</Text>

			<ThemeToggle />
		</View>
	);
}
