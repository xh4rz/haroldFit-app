import { useCallback, useState } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { z } from 'zod';
import { loginFormSchema } from '../validation/loginFormSchema';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '@/components/Input';

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
	const { login } = useAuthStore();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onLogin = async (data: LoginFormData) => {
		setLoading(true);
		try {
			await login(data.email, data.password);
		} catch (error) {
			const errorObject = JSON.parse(error.message);
			console.log({ errorObject });
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			Keyboard.dismiss();
			const timer = setTimeout(() => {}, 100);
			return () => clearTimeout(timer);
		}, [])
	);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			className="bg-theme"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View className="flex-1 justify-center p-1 mx-2.5">
				<View
					className={`p-5 rounded-2xl shadow-sm shadow-black w-full bg-card-theme`}
				>
					<Text className="text-4xl mb-12 text-center font-bold text-primary">
						HaroldFit
						<Text className="text-secondary">App</Text>
					</Text>

					<Input
						autoFocus
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

					<TouchableOpacity className="items-end">
						<Text className="text-sm text-center text-primary">
							Forgot your Password?
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="w-full h-12 rounded-lg items-center justify-center mt-5 bg-secondary"
						onPress={handleSubmit(onLogin)}
					>
						<Text className="text-white text-base font-bold">Login</Text>
					</TouchableOpacity>

					<Text className={`mt-5 text-center text-primary-theme`}>
						Don&apos;t have an account?{' '}
						<Link href="/auth/signup" className="font-bold text-secondary">
							Sign Up
						</Link>
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
