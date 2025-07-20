import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function SignInScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				padding: 4,
				gap: 10
			}}
		>
			<Text style={{ fontSize: 20 }}>Sign In Screen</Text>

			<Link asChild push href="/modal">
				<Button title="Open Modal" color="red" />
			</Link>
		</View>
	);
}
