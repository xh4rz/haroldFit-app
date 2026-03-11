import React from 'react';
import { View } from 'react-native';
import { ExerciseInfo, VideoPlayer } from '@/components/molecules';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseDetailProps = {
	exercise: Exercise;
};

export const ExerciseDetail = ({ exercise }: ExerciseDetailProps) => {
	return (
		<View>
			<View className="h-72">
				<VideoPlayer url={exercise.video} autoPlay loop />
			</View>

			<View className="m-5">
				<ExerciseInfo exercise={exercise} />
			</View>
		</View>
	);
};
