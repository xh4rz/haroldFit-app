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
import { registerFormSchema } from '../validation/registerFormSchema';
import { useTheme } from '../../../context/ThemeContext';
import { Input } from '@/components/Input';

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function SignupForm() {
	const { register } = useAuthStore();
	const { theme } = useTheme();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
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

	const onRegister = async (data: RegisterFormData) => {
		console.log({ data });
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
			className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View className="flex-1 justify-center p-1 mx-2.5">
				<View
					className={`p-5 rounded-2xl shadow-sm shadow-black w-full ${
						theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
					}`}
				>
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

					<Text
						className={`mt-5 text-center ${
							theme === 'dark' ? 'text-white' : 'text-black'
						}`}
					>
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
