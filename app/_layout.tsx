import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const isLoggedIn = false;
const shouldCreateAccount = false;

export default function RootLayout() {
	return (
		// <Stack screenOptions={{ headerStyle: { backgroundColor: 'red' } }}>
		// 	<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		// </Stack>

		<React.Fragment>
			<StatusBar style="auto" />
			<Stack
				screenOptions={{
					headerShown: true,
					// headerStyle: { backgroundColor: '#f4511e' },
					// headerTintColor: '#fff',
					// headerTitleStyle: {
					// 	fontWeight: 'bold'
					// },
					headerTitleAlign: 'center',
					animation: 'slide_from_right'
				}}
			>
				<Stack.Protected guard={isLoggedIn}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					{/* <Stack.Screen
						name="modal"
						options={{
							presentation: 'modal'
						}}
					/> */}
				</Stack.Protected>
				<Stack.Protected guard={!isLoggedIn}>
					<Stack.Screen name="sign-in" />
				</Stack.Protected>
				<Stack.Protected guard={!isLoggedIn}>
					<Stack.Screen name="create-account" />
				</Stack.Protected>
			</Stack>
		</React.Fragment>
	);
}
