import React from 'react';
import { AppContextProvider } from '@/context/AppContext';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { ThemeToggle } from '@/components/ThemeToggle';

function RootLayout() {
	const { isAuthenticated } = useAuthStore();
	return (
		<React.Fragment>
			<StatusBar style="auto" />
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: '#ffa500' },
					headerTintColor: '#9333ea',
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
					headerRight: () => <ThemeToggle />
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
					<Stack.Screen name="dashboard" />
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
