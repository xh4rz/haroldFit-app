import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/atoms';
import { getExerciseById } from '@/modules/exercise/services/exercise';
import { ExerciseDetail } from '@/components/organisms';
import { LoadingView } from '@/components/molecules';

export const ExerciseDetailView = () => {
	const { id } = useLocalSearchParams<{ id: string; title: string }>();

	const {
		data: exercise,
		isPending,
		isError
	} = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => getExerciseById(id)
	});

	if (isPending) {
		return <LoadingView titleLoading="details exercise" />;
	}

	if (isError || !exercise) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>An error occurred while loading the exercise details.</Text>
			</View>
		);
	}

	return (
		<View className="flex-1">
			<ExerciseDetail exercise={exercise} />
		</View>
	);
};
