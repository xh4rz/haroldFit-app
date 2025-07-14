import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				gap: 10
			}}
		>
			<Text style={{ fontSize: 50 }}>Login</Text>

			<TextInput
				placeholder="Username"
				keyboardType="default"
				autoCapitalize="none"
				style={{
					borderWidth: 1,
					borderColor: 'black',
					width: '80%',
					padding: 10,
					borderRadius: 5
				}}
			/>

			<TextInput
				placeholder="Password"
				keyboardType="visible-password"
				autoCapitalize="none"
				style={{
					borderWidth: 1,
					borderColor: 'black',
					width: '80%',
					padding: 10,
					borderRadius: 5
				}}
			/>

			{/* <Link href="/(auth)/register">Register</Link> */}

			<TouchableOpacity onPress={() => router.push('/(auth)/register')}>
				<Text style={{ color: 'blue', fontSize: 16 }}>Register</Text>
			</TouchableOpacity>
		</View>
	);
}
