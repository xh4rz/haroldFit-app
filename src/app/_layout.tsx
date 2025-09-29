import React from 'react';
import { AppContextProvider } from '@/context/AppContext';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Stack } from 'expo-router';
import '../../global.css';
import { colors } from '@/constants/colors';

function RootLayout() {
	const { isAuthenticated } = useAuthStore();

	return (
		<React.Fragment>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.secondary,
					headerTitleAlign: 'center',
					animation: 'slide_from_right'
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
					<Stack.Screen name="dashboard" options={{ headerShown: false }} />
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
