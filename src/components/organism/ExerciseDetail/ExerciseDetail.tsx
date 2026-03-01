import React from 'react';
import { View } from 'react-native';
import { ExerciseInfo, VideoPlayer } from '@/components/molecules';
import { ExerciseResponse } from '@/infrastructure/interfaces';

type ExerciseDetailProps = {
	exercise: ExerciseResponse;
};

export const ExerciseDetail = ({ exercise }: ExerciseDetailProps) => {
	return (
		<View>
			<View className="h-72">
				<VideoPlayer url={exercise.video} autoPlayLoop />
			</View>

			<View className="m-5">
				<ExerciseInfo exercise={exercise} />
			</View>
		</View>
	);
};
