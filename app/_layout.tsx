import { Stack } from 'expo-router';

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerStyle: { backgroundColor: 'red' } }}>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	);
}
