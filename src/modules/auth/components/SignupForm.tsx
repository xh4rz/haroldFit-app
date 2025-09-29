import { useState, useCallback } from 'react';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect } from '@react-navigation/native';
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	View,
	Keyboard
} from 'react-native';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import { signupFormSchema } from '../validation/SignupFormSchema';
import { Input } from '@/components/Input';

type SignupFormData = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
	const { register } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	useFocusEffect(
		useCallback(() => {
			Keyboard.dismiss();
			const timer = setTimeout(() => {}, 100);
			return () => clearTimeout(timer);
		}, [])
	);

	const onRegister = async (data: SignupFormData) => {
		setLoading(true);
		try {
			await register(data.name, data.email, data.password);
		} catch (error) {
			const errorObject = JSON.parse(error.message);
			console.log({ errorObject });
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			className="bg-theme"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View className="flex-1 justify-center p-1 mx-2.5">
				<View className="p-5 rounded-2xl shadow-sm shadow-black w-full bg-card-theme">
					<Text className="text-4xl mb-12 text-center font-bold text-primary">
						HaroldFit
						<Text className="text-secondary">App</Text>
					</Text>

					<Input
						autoFocus
						required
						autoCapitalize="none"
						control={control}
						name="name"
						label="Username"
						placeholder="Enter your username"
						error={errors.name}
					/>

					<Input
						required
						autoCapitalize="none"
						keyboardType="email-address"
						control={control}
						name="email"
						label="Email"
						placeholder="Enter your email"
						error={errors.email}
					/>

					<Input
						required
						control={control}
						autoCapitalize="none"
						name="password"
						label="Password"
						placeholder="Enter your password"
						error={errors.password}
						secureTextEntry={true}
					/>

					<TouchableOpacity
						className="w-full h-12 rounded-lg items-center justify-center mt-5 bg-secondary"
						onPress={handleSubmit(onRegister)}
						disabled={loading}
					>
						<Text className="text-white text-base font-bold">
							{loading ? 'Loading...' : 'Register'}
						</Text>
					</TouchableOpacity>

					<Text className="mt-5 text-center text-primary-theme">
						Already have an account?{' '}
						<Link href="/auth/login" className="font-bold text-secondary">
							Login
						</Link>
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
