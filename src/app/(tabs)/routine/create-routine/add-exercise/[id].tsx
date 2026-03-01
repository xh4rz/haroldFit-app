import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/atoms';
import { getExerciseById } from '@/modules/routine/services/exercise';
import { ExerciseDetail } from '@/components/organism';

export default function ExerciseScreen() {
	const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

	const {
		data: exercise,
		isPending,
		isError
	} = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => getExerciseById(id)
	});

	if (isPending) {
		return (
			<View className="flex-1 items-center justify-center">
				<Stack.Screen
					options={{
						title: 'Loading Title...'
					}}
				/>
				<ActivityIndicator size="large" color="white" />
				<Text className="mt-4">Loading Details exercise...</Text>
			</View>
		);
	}

	if (isError || !exercise) {
		return (
			<View className="flex-1 items-center justify-center">
				<Stack.Screen
					options={{
						title: ''
					}}
				/>
				<Text>An error occurred while loading the exercise details.</Text>
			</View>
		);
	}

	return (
		<View className="flex-1">
			<Stack.Screen
				options={{
					title: title
				}}
			/>

			<ExerciseDetail exercise={exercise} />
		</View>
	);
}
