import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface InputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
	control: Control<any>;
	name: string;
	label?: string;
	error?: FieldError;
	helperText?: string;
	required?: boolean;
}

export const Input: React.FC<InputProps> = ({
	control,
	name,
	label,
	error,
	helperText,
	required = false,
	...textInputProps
}) => {
	const { theme } = useTheme();

	return (
		<View className="w-full mb-4">
			<View className="relative">
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								className={`h-14 border-2 w-full rounded-xl text-base px-4 pt-6 pb-2 ${
									error
										? 'border-red-500 bg-red-50 dark:bg-red-900/20'
										: `${
												theme === 'dark'
													? 'border-gray-600 bg-gray-700 focus:border-purple-600'
													: 'border-gray-300 bg-gray-50 focus:border-purple-600'
											}`
								} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
								placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
								onChangeText={onChange}
								value={value}
								{...textInputProps}
							/>

							{label && (
								<Text
									className={`absolute top-2 left-4 text-xs font-medium ${
										theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
									} ${error ? 'text-red-500' : ''}`}
								>
									{label}
									{required && (
										<Text
											className={`${error ? 'text-red-500' : 'text-purple-600'}`}
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
					className={`text-sm mt-1 ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
				>
					{helperText}
				</Text>
			) : null}
		</View>
	);
};
