import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseInfoProps = {
	exercise: Exercise;
};

export const ExerciseInfo = ({ exercise }: ExerciseInfoProps) => {
	return (
		<View className="flex gap-4">
			<Text>{exercise.title}</Text>
			<Text>Primary: {exercise.primaryMuscle.name}</Text>
			{exercise.secondaryMuscles?.length !== 0 && (
				<Text>
					Secondary: {exercise.secondaryMuscles?.map((e) => e.name).join(', ')}
				</Text>
			)}
			<View>
				<Text>Instructions</Text>
				<View>
					{exercise.instruction.map((item, index) => (
						<Text key={index}>
							{index + 1}. {item}
						</Text>
					))}
				</View>
			</View>
		</View>
	);
};
