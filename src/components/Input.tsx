import React, { useContext, useState } from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import {
	Text,
	TextInput,
	TextInputProps,
	View,
	TouchableOpacity
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
	control: Control<any>;
	name: string;
	label?: string;
	error?: FieldError;
	helperText?: string;
	required?: boolean;
	disabled?: boolean;
	isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
	control,
	name,
	label,
	error,
	helperText,
	required = false,
	disabled = false,
	isPassword = false,
	...textInputProps
}) => {
	const { theme } = useContext(ThemeContext);
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const getBorderColor = () => {
		if (error && isFocused) return 'border-red-700';

		if (error) return 'border-red-500';

		if (isFocused) return 'border-purple-600';

		return theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
	};

	const getBackgroundColor = () => {
		if (error) {
			return theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50';
		}

		return theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
	};

	// transition-all duration-300

	return (
		<View className="w-full mb-4">
			<View className="relative">
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value, ref } }) => (
						<>
							<TextInput
								ref={ref}
								editable={!disabled}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								onChangeText={onChange}
								value={value}
								secureTextEntry={isPassword && !showPassword}
								className={`
								h-14 w-full rounded-xl text-base px-4 pt-6 pb-2 border-2
								${getBorderColor()}
								${getBackgroundColor()}
								${disabled ? 'opacity-60' : 'opacity-100'}
								${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                				`}
								placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
								{...textInputProps}
							/>

							{isPassword && (
								<TouchableOpacity
									onPress={() => setShowPassword(!showPassword)}
									className={`absolute right-4 top-1/2 -translate-y-1/2 ${
										disabled ? 'opacity-60' : 'opacity-100'
									}`}
									disabled={disabled}
								>
									<Ionicons
										name={showPassword ? 'eye' : 'eye-off'}
										size={20}
										color={theme === 'dark' ? 'white' : 'gray'}
									/>
								</TouchableOpacity>
							)}

							{label && (
								<Text
									className={`absolute top-2 left-4 text-xs font-medium
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    ${error ? 'text-red-500' : ''}
                  `}
								>
									{label}
									{required && (
										<Text
											className={`${
												error ? 'text-red-500' : 'text-purple-600'
											}`}
										>
											{' '}
											*
										</Text>
									)}
								</Text>
							)}
						</>
					)}
				/>
			</View>

			{error ? (
				<Text className="text-red-500 text-sm mt-1 ml-1">{error.message}</Text>
			) : helperText ? (
				<Text
					className={`text-sm mt-1 ml-1 ${
						theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
					}`}
				>
					{helperText}
				</Text>
			) : null}
		</View>
	);
};
