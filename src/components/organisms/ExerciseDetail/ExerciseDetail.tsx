import React from 'react';
import { View } from 'react-native';
import {
	ExerciseInfo,
	ExerciseInstructions,
	VideoPlayer
} from '@/components/molecules';
import { Exercise } from '@/infrastructure/interfaces';
import { TabView } from '../TabView';
import { Route, SceneMap } from 'react-native-tab-view';

interface ExerciseDetailProps {
	exercise: Exercise;
}

const routes: Route[] = [
	{ key: 'first', title: 'Summary' },
	{ key: 'second', title: 'How to' }
];

export const ExerciseDetail = ({ exercise }: ExerciseDetailProps) => {
	const Summary = () => (
		<View className="m-5 flex gap-4">
			<ExerciseInfo exercise={exercise} />
		</View>
	);

	const HowTo = () => (
		<View className="m-5">
			<ExerciseInstructions exercise={exercise} />
		</View>
	);

	const renderScene = SceneMap({
		first: Summary,
		second: HowTo
	});

	return (
		<View className="flex-1">
			<View className="h-72">
				<VideoPlayer url={exercise.video} autoPlay loop />
			</View>
			<TabView routes={routes} renderScene={renderScene} />
		</View>
	);
};
