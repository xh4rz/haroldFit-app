import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getExercises } from '@/modules/routine/services/exercise';
import { ExerciseList, MuscleModalList } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { getMuscles } from '@/modules/routine/services/muscle';
import { LoadingView } from '@/components/molecules';

export const AddExercise = () => {
	const router = useRouter();

	const [showBottomSheetModalMuscle, setShowBottomSheetModalMuscle] =
		useState(false);

	const { data: dataExercises, isPending: isPendingExercises } = useQuery({
		queryKey: ['exercises'],
		queryFn: getExercises
	});

	const { data: dataMuscles, isPending: isPendingMuscles } = useQuery({
		queryKey: ['muscles'],
		queryFn: getMuscles,
		enabled: !isPendingExercises
	});

	const handlePressExercise = (id: string, title: string) => {
		router.push({
			pathname: '/routine/create-routine/add-exercise/[id]',
			params: { id, title }
		});
	};

	const [idMuscle, setIdMuscle] = useState(1);

	const handlePressMuscle = (id: number) => {
		setIdMuscle(id);
		setShowBottomSheetModalMuscle(false);
	};

	const findMuscle = dataMuscles?.find((muscle) => muscle.id === idMuscle);

	if (isPendingExercises) {
		return <LoadingView titleLoading="exercises" />;
	}

	return (
		<View>
			{/* <View className="items-center justify-center py-4">
				<Text className="text-center text-lg font-bold">List Exercises</Text>
			</View> */}

			<View className="flex-row gap-2 p-4">
				<View className="flex-1">
					<Button
						disabled
						title="Equipment"
						variant="secondary"
						onPress={() => {}}
					/>
				</View>

				<View className="flex-1">
					<Button
						title={findMuscle?.name ?? ''}
						loading={isPendingMuscles}
						variant="secondary"
						onPress={() => setShowBottomSheetModalMuscle(true)}
					/>
				</View>
			</View>

			<ExerciseList data={dataExercises} onPress={handlePressExercise} />

			<MuscleModalList
				data={dataMuscles}
				onPress={handlePressMuscle}
				showBottomSheetModal={showBottomSheetModalMuscle}
				setShowBottomSheetModal={setShowBottomSheetModalMuscle}
				idMuscle={idMuscle}
			/>
		</View>
	);
};
