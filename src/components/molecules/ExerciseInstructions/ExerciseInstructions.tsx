import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@/components/atoms';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseInfoProps = {
	exercise: Exercise;
};

export const ExerciseInstructions = ({ exercise }: ExerciseInfoProps) => {
	return (
		<ScrollView className="pr-4">
			<View className="flex gap-2">
				<Text className="text-lg font-bold">{exercise.title}</Text>

				{exercise.instruction.map((item, index) => (
					<View key={index} className="flex-row items-start gap-6">
						<Text className="font-bold">{index + 1}.</Text>
						<Text className="flex-1">{item}</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
};
