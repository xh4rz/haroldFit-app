import { Button, Text, View } from 'react-native';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Link } from 'expo-router';

export default function HomeScreen() {
	const { user } = useAuthStore();

	return (
		<View className="flex-1 justify-center items-center">
			<View className="flex flex-col items-center gap-4">
				<Text className="text-primary-theme text-4xl font-bold">
					Bienvenido a la aplicación
				</Text>
				<Text className="text-primary text-2xl font-bold">
					{user?.fullName}
				</Text>

				<Link href="/home/home-nested" push asChild>
					<Button title="Home Nested" />
				</Link>
			</View>
		</View>
	);
}
