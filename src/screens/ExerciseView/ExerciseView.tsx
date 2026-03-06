import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getExercises } from '@/modules/routine/services/exercise';
import { BottomSheetSelectList, ExerciseList } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { getMuscles } from '@/modules/routine/services/muscle';
import { LoadingView } from '@/components/molecules';
import { getEquipments } from '@/modules/routine/services/equipment';

export const ExerciseView = () => {
	const router = useRouter();

	const [showModalEquipment, setShowModalEquipment] = useState(false);

	const [showModalMuscle, setShowModalMuscle] = useState(false);

	const [idMuscle, setIdMuscle] = useState(1);

	const [idEquipment, setIdEquipment] = useState(1);

	const { data: dataExercises, isPending: isPendingExercises } = useQuery({
		queryKey: ['exercises'],
		queryFn: getExercises
	});

	const { data: dataMuscles, isPending: isPendingMuscles } = useQuery({
		queryKey: ['muscles'],
		queryFn: getMuscles,
		enabled: !isPendingExercises
	});

	const { data: dataEquipments, isPending: isPendingEquipments } = useQuery({
		queryKey: ['equipments'],
		queryFn: getEquipments,
		enabled: !isPendingExercises
	});

	const handlePressExercise = (id: string, title: string) => {
		router.push({
			pathname: '/exercise/[id]',
			params: { id, title }
		});
	};

	const handlePressEquipment = (id: number) => {
		setIdEquipment(id);
		setShowModalEquipment(false);
	};

	const handlePressMuscle = (id: number) => {
		setIdMuscle(id);
		setShowModalMuscle(false);
	};

	const findMuscle = dataMuscles?.find((muscle) => muscle.id === idMuscle);

	const findEquipment = dataEquipments?.find(
		(equipment) => equipment.id === idEquipment
	);

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
						title={findEquipment?.name ?? ''}
						loading={isPendingEquipments}
						variant="secondary"
						onPress={() => setShowModalEquipment(true)}
					/>
				</View>
				<View className="flex-1">
					<Button
						title={findMuscle?.name ?? ''}
						loading={isPendingMuscles}
						variant="secondary"
						onPress={() => setShowModalMuscle(true)}
					/>
				</View>
			</View>

			<ExerciseList data={dataExercises} onPress={handlePressExercise} />

			<BottomSheetSelectList
				title="Eqipments"
				data={dataEquipments}
				onPress={handlePressEquipment}
				show={showModalEquipment}
				setShow={setShowModalEquipment}
				idSelected={idEquipment}
				imageScale={0.6}
			/>

			<BottomSheetSelectList
				title="Muscles"
				data={dataMuscles}
				onPress={handlePressMuscle}
				show={showModalMuscle}
				setShow={setShowModalMuscle}
				idSelected={idMuscle}
				imageScale={1.2}
			/>
		</View>
	);
};
