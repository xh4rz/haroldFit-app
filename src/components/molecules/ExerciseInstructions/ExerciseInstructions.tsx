import React from 'react';
import { View, TextInput } from 'react-native';
import {
	useFieldArray,
	Control,
	Controller,
	FieldErrors
} from 'react-hook-form';
import { Button, IconButton, Text } from '@/components/atoms';
import { PlusIcon, XIcon } from 'phosphor-react-native';
import { colors } from '@/constants/colors';
import { ExerciseCreateFormData } from '@/modules/exercise/exerciseCreateFormSchema';

interface ExerciseInstructionsProps {
	control: Control<ExerciseCreateFormData>;
	error: FieldErrors<ExerciseCreateFormData>['instruction'];
	// errors: FieldErrors<ExerciseCreateFormData>;
}

export const ExerciseInstructions = ({
	control,
	error
}: ExerciseInstructionsProps) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'instruction'
	});

	const errorsMessage = error?.message || error?.root?.message;

	return (
		<View className="gap-3 my-5">
			<View className="flex flex-row justify-between gap-2">
				<Text>Instructions *</Text>
				<Button
					title="Add instruction"
					size="sm"
					variant="outline"
					iconLeft={<PlusIcon color={colors.primary} />}
					className="py-0.5 px-2"
					fullWidth={false}
					// onPress={() => append('')}
					onPress={() => append({ text: '' })}
				/>
			</View>

			{fields.map((field, index) => {
				// const errorMessage = errors?.[index]?.message;
				const errorMessage = error?.[index]?.text?.message;
				return (
					<View key={field.id} className="flex-row items-center gap-2">
						<Text className="font-semibold w-6 text-center">{index + 1}.</Text>

						<View className="flex-1">
							<Controller
								control={control}
								// name={`instruction.${index}`}
								name={`instruction.${index}.text`}
								render={({ field: { onChange, value } }) => (
									<TextInput
										value={value}
										onChangeText={onChange}
										placeholder="Write instruction..."
										multiline
										textAlignVertical="top"
										className="flex-1 min-h-12 border rounded-lg px-3 py-2 text-white"
										placeholderTextColor="#9CA3AF"
									/>
								)}
							/>

							{errorMessage && (
								<Text className="text-red-500 text-xs ml-2">
									{errorMessage}
								</Text>
							)}
						</View>

						<IconButton
							variant="outline"
							size="sm"
							icon={<XIcon color={colors.secondary} />}
							onPress={() => remove(index)}
							className="mr-1"
						/>
					</View>
				);
			})}

			{/* {errors?.message && (
				<Text className="text-red-500">{errors.message}</Text>
			)} */}

			{errorsMessage && (
				<Text className="text-red-500 mt-2">{errorsMessage}</Text>
			)}
		</View>
	);
};
