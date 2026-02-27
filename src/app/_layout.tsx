import React from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { AppContextProvider } from '@/context/AppContext';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import '../../global.css';

function RootLayout() {
	const { isAuthenticated } = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();

	const handleBack = () => {
		if (pathname === '/auth/login') {
			router.dismissTo('/');
		} else {
			router.back();
		}
	};

	console.log(pathname);

	return (
		<React.Fragment>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.secondary,
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
					headerLeft: () => (
						<TouchableOpacity onPress={handleBack}>
							<Ionicons name="arrow-back" size={24} color={colors.secondary} />
						</TouchableOpacity>
					)
				}}
			>
				<Stack.Protected guard={!isAuthenticated}>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen
						name="auth/login"
						options={{
							headerTitle: 'Login'
						}}
					/>
					<Stack.Screen
						name="auth/signup"
						options={{ headerTitle: 'Signup' }}
					/>
				</Stack.Protected>

				<Stack.Protected guard={isAuthenticated}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack.Protected>
			</Stack>
		</React.Fragment>
	);
}

export default function AppLayout() {
	return (
		<AppContextProvider>
			<RootLayout />
		</AppContextProvider>
	);
}
