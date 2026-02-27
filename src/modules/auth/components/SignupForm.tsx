import { useState, useCallback, useEffect } from 'react';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect } from '@react-navigation/native';
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	View,
	Keyboard,
	ScrollView
} from 'react-native';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import {
	passwordValidationRules,
	signupFormSchema
} from '../validation/signupFormSchema';
import { Input } from '@/components/Input';
import { delay } from '@/utils';
import { Button } from '@/components';
import { SignInIcon } from 'phosphor-react-native';

type SignupFormData = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
	const { register } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupFormSchema),
		mode: 'onChange',
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const password = watch('password') || '';

	const rules = passwordValidationRules.map((rule) => ({
		label: rule.label,
		valid: rule.test(password)
	}));

	const onRegister = async (data: SignupFormData) => {
		setLoading(true);
		clearErrors('root');
		await delay(1000);
		try {
			await register(data.fullName, data.email, data.password);
		} catch (error) {
			const errorObject = JSON.parse(error.message);
			setError('root', {
				type: 'custom',
				message: errorObject.message
			});
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

	useEffect(() => {
		const subscription = watch(() => {
			if (errors.root) {
				clearErrors('root');
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, errors.root, clearErrors]);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			className="bg-theme"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 120
				}}
				keyboardShouldPersistTaps="handled"
			>
				<View className=" m-6">
					<Input
						autoFocus
						required
						autoCapitalize="none"
						control={control}
						name="fullName"
						label="Full Name"
						placeholder="Enter your Full Name"
						error={errors.fullName}
						disabled={loading}
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
						disabled={loading}
					/>

					<Input
						required
						control={control}
						autoCapitalize="none"
						name="password"
						label="Password"
						placeholder="Enter your password"
						error={errors.password}
						isPassword={true}
						disabled={loading}
					/>

					<Input
						required
						control={control}
						autoCapitalize="none"
						name="confirmPassword"
						label="Repeat Password"
						placeholder="Repeat your password"
						error={errors.confirmPassword}
						isPassword={true}
						disabled={loading}
					/>

					{errors.root && (
						<Text className="text-red-500 mb-5">{errors.root.message}</Text>
					)}

					<View>
						<Text className="text-white mb-2">Password requirements: </Text>
						{rules.map((rule, index) => (
							<Text
								key={index}
								className={`text-[13px] mb-0.5 ${
									rule.valid ? 'text-green-500' : 'text-gray-400'
								}`}
							>
								{rule.label}
							</Text>
						))}
					</View>

					<Button
						title="Register"
						variant="secondary"
						onPress={handleSubmit(onRegister)}
						iconLeft={<SignInIcon />}
						className="mt-5"
						loading={loading}
					/>

					<Text className="mt-5 text-center text-primary-theme">
						Already have an account?{' '}
						<Link href="/auth/login" className="font-bold text-secondary">
							Login
						</Link>
					</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
