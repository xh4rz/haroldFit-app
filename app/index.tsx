import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.welcomeText}>Welcome to</Text>

				<Text style={styles.title}>
					HaroldFit<Text style={styles.colorSecondary}>App</Text>
				</Text>

				<Text style={styles.subtitle}>
					Discover everything our app has to offer
				</Text>

				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.primaryButton}
						onPress={() => router.push('/auth/login')}
					>
						<Text style={styles.primaryButtonText}>Login</Text>
					</Pressable>

					<Pressable
						style={styles.secondaryButton}
						onPress={() => router.push('/auth/signup')}
					>
						<Text style={styles.secondaryButtonText}>Create Account</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const COLORS = {
	primary: '#FFA500',
	secondary: '#800080',
	white: '#FFFFFF',
	black: '#000'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	welcomeText: {
		fontSize: 30,
		marginBottom: 10,
		textAlign: 'center',
		color: COLORS.black
	},
	title: {
		fontSize: 40,
		marginBottom: 50,
		textAlign: 'center',
		fontWeight: 'bold',
		color: COLORS.primary
	},
	colorSecondary: {
		color: COLORS.secondary
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
		marginBottom: 40,
		lineHeight: 24
	},
	buttonContainer: {
		width: '100%',
		gap: 16
	},
	primaryButton: {
		backgroundColor: COLORS.secondary,
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 8,
		alignItems: 'center'
	},
	primaryButtonText: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: '600'
	},
	secondaryButton: {
		borderWidth: 1,
		borderColor: COLORS.primary,
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 8,
		alignItems: 'center'
	},
	secondaryButtonText: {
		color: COLORS.primary,
		fontSize: 16,
		fontWeight: '600'
	}
});
