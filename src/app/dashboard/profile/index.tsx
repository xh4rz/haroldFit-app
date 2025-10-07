import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
	const { logout } = useAuthStore();
	return (
		<View className="flex-1 bg-theme">
			<View className="flex-1 justify-center items-center px-5 gap-4">
				<Text className="text-3 font-bold text-primary-theme text-4xl">
					Bienvenido al perfil
				</Text>

				<TouchableOpacity
					onPress={logout}
					className="bg-red-500 p-2 rounded-md"
				>
					<Text className="text-white">Cerrar sesión</Text>
				</TouchableOpacity>

				{/* <ThemeToggle /> */}
			</View>
		</View>
	);
}
