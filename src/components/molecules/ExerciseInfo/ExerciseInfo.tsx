import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseInfoProps = {
	exercise: Exercise;
};

export const ExerciseInfo = ({ exercise }: ExerciseInfoProps) => {
	return (
		<View>
			<Text className="text-lg font-bold mb-1">{exercise.title}</Text>
			<Text>
				Primary:{' '}
				<Text className="text-white/60">{exercise.primaryMuscle.name}</Text>
			</Text>
			{exercise.secondaryMuscles?.length !== 0 && (
				<Text>
					Secondary:{' '}
					<Text className="text-white/60">
						{' '}
						{exercise.secondaryMuscles?.map((e) => e.name).join(', ')}
					</Text>
				</Text>
			)}
		</View>
	);
};
