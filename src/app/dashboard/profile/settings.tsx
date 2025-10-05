import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function SettingsScreen() {
	return (
		<View className="flex-1 bg-theme">
			<Text>Cambiar tema del sistema</Text>
			<Link href="/dashboard/profile/mode" push asChild>
				<Button title="Theme" />
			</Link>
		</View>
	);
}
