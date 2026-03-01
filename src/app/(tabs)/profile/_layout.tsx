import { colors } from '@/constants/colors';
import { useThemeColors } from '@/hooks';
import { AntDesign } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProfileLayout() {
	const router = useRouter();

	const theme = useThemeColors();

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
						onPress={() => router.navigate('/profile/settings')}
					>
						<AntDesign name="setting" size={24} color="white" />
					</TouchableOpacity>
				),
				contentStyle: {
					backgroundColor: theme.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Profile' }}
			/>
			<Stack.Screen
				name="settings/index"
				options={{
					headerShown: true,
					title: 'Settings',
					headerRight: () => null
				}}
			/>
			<Stack.Screen
				name="settings/theme"
				options={{
					headerShown: true,
					title: 'Theme',
					headerRight: () => null
				}}
			/>
		</Stack>
	);
}
