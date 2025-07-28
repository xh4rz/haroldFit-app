import { Link } from 'expo-router';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

export default function SignInScreen() {
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.content}>
				<View style={styles.card}>
					<Text style={styles.title}>
						HaroldFit<Text style={styles.colorSecondary}>App</Text>
					</Text>

					<Text style={styles.label}>Username</Text>
					<TextInput
						style={[styles.input, { marginBottom: 10 }]}
						placeholder="Enter your username"
						autoCapitalize="none"
						autoFocus
					/>

					<Text style={styles.label}>Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter your password"
						secureTextEntry={true}
						autoCapitalize="none"
					/>

					<TouchableOpacity style={styles.forgotPassword}>
						<Text style={styles.forgotPasswordText}>Forgot your Password?</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>

					<Text style={styles.signUpText}>
						Don&apos;t have an account?{' '}
						<Link href="/create-account" style={styles.colorSecondary}>
							Sign Up
						</Link>
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		padding: 4,
		marginHorizontal: 10
	},
	title: {
		fontSize: 40,
		marginBottom: 50,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#FFA500'
	},
	card: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	label: {
		marginBottom: 2,
		fontSize: 16,
		fontWeight: 'bold'
	},
	input: {
		height: 40,
		borderWidth: 1,
		width: '100%',
		borderRadius: 5
	},
	button: {
		width: '100%',
		backgroundColor: '#800080',
		height: 50,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	forgotPassword: {
		marginTop: 2,
		marginBottom: 20,
		alignItems: 'flex-end'
	},
	forgotPasswordText: {
		color: '#FFA500',
		fontSize: 14
	},
	signUpText: {
		marginTop: 20,
		textAlign: 'center'
	},
	colorPrimary: {
		color: '#FFA500'
	},
	colorSecondary: {
		color: '#800080'
	}
});
