import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function WelcomeScreen() {
	return (
		<View className="flex-1 bg-theme">
			<View className="flex-1 justify-center items-center px-5">
				<Text className="text-3xl mb-2.5 text-center font-medium text-primary-theme">
					Welcome to
				</Text>

				<Text className="text-4xl mb-12 text-center font-bold text-primary">
					HaroldFit<Text className="text-secondary">App</Text>
				</Text>

				<Text className="text-base text-center mb-10 leading-6 text-primary-theme">
					Discover everything our app has to offer
				</Text>

				<View className="w-full gap-4">
					<Pressable
						className="bg-secondary py-4 px-8 rounded-lg items-center"
						onPress={() => router.push('/auth/login')}
					>
						<Text className="text-white text-base font-semibold">Login</Text>
					</Pressable>

					<Pressable
						className="border py-4 px-8 rounded-lg items-center bg-transparent border-primary"
						onPress={() => router.push('/auth/signup')}
					>
						<Text className="text-base font-semibold text-primary">
							Create Account
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
