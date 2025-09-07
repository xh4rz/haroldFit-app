import { AppContextProvider } from '@/context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const isLoggedIn = false;
const shouldCreateAccount = false;

function RootLayout() {
	return (
		<React.Fragment>
			<StatusBar style="auto" />
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: '#FFA500' },
					headerTintColor: '#800080',
					headerTitleAlign: 'center',
					animation: 'slide_from_right'
				}}
			>
				<Stack.Protected guard={!isLoggedIn}>
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

				<Stack.Protected guard={isLoggedIn}>
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
