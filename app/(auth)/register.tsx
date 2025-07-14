import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				gap: 10
			}}
		>
			<Text style={{ fontSize: 50 }}>Register</Text>

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
				placeholder="Email"
				keyboardType="email-address"
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

			<TouchableOpacity onPress={() => router.push('/(auth)/login')}>
				<Text style={{ color: 'blue', fontSize: 16 }}>Login</Text>
			</TouchableOpacity>
		</View>
	);
}
