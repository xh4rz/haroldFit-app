import { Button, Text, View } from 'react-native';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Link } from 'expo-router';

export default function HomeScreen() {
	const { user } = useAuthStore();

	return (
		<View className="flex-1 bg-theme">
			<View className="flex-1 justify-center items-center px-5">
				<View className="flex flex-col items-center">
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
		</View>
	);
}
