import { ThemeToggle } from '@/components/ThemeToggle';
import { Text, View } from 'react-native';

export default function ModeScreen() {
	return (
		<View className="flex-1 bg-theme">
			<Text>Cambiar tema del sistema</Text>
			<ThemeToggle />
		</View>
	);
}
