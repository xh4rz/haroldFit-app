import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AuthLayout() {
	return (
		<View style={styles.container}>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: { backgroundColor: '#f4511e' },
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold'
					},
					headerTitleAlign: 'center',
					animation: 'slide_from_right'
				}}
			>
				<Stack.Screen name="login" options={{ title: 'Login' }} />
				<Stack.Screen name="register" options={{ title: 'Register' }} />
			</Stack>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
