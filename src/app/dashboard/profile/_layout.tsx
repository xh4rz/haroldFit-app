import { colors } from '@/constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProfileLayout() {
	const router = useRouter();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				animation: 'slide_from_right',
				headerRight: () => (
					<TouchableOpacity
						onPress={() => router.navigate('/dashboard/profile/settings')}
					>
						<AntDesign name="setting" size={24} color="white" />
					</TouchableOpacity>
				)
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Profile' }}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerShown: true,
					title: 'Settings',
					headerRight: () => null
				}}
			/>
			<Stack.Screen
				name="mode"
				options={{
					headerShown: true,
					title: 'Theme',
					headerRight: () => null
				}}
			/>
		</Stack>
	);
}
