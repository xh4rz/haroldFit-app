import { colors } from '@/constants/colors';
import { useCallback, useState } from 'react';

import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { getEjercicies } from '@/modules/training/services/training/getEjercicies';
import { ExerciseResponse } from '@/infrastructure/interfaces';
import { Separator, VideoView } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';

type ItemProps = {
	exercise: ExerciseResponse;
	onPress: () => void;
	isSelected: boolean;
	textColor: string;
};

const Item = ({ exercise, onPress, isSelected, textColor }: ItemProps) => {
	return (
		<TouchableOpacity onPress={onPress} className={`flex flex-row gap-4 p-4 `}>
			<View
				style={{
					height: 50,
					width: 50,
					borderRadius: 50,
					overflow: 'hidden'
				}}
			>
				<VideoView url={exercise.video} />
			</View>
			<View>
				<Text className="text-white">{exercise.title}</Text>
				<Text className="text-white/40">{exercise.primaryMuscle.name}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default function AddExerciseScreen() {
	const [selectedId, setSelectedId] = useState<string>();

	const renderItem = ({ item }: { item: ExerciseResponse }) => {
		const isSelected = item.id === selectedId;
		const color = isSelected ? colors.primary : 'white';

		return (
			<Item
				exercise={item}
				onPress={() => setSelectedId(item.id)}
				isSelected={isSelected}
				textColor={color}
			/>
		);
	};

	const {
		data = [],

		refetch,
		isFetching
	} = useQuery({
		queryKey: ['exercises'],
		queryFn: getEjercicies
	});

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	if (isFetching) {
		return (
			<View className="flex-1 bg-theme items-center justify-center">
				<ActivityIndicator size="large" color="white" />
				<Text className="text-white mt-4">Loading exercices...</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-theme">
			<View className="flex-1">
				<View className="items-center justify-center py-4">
					<Text className="text-white text-center text-lg font-bold">
						Lista de ejercicios
					</Text>
				</View>

				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={Separator}
					ListEmptyComponent={
						<View className="flex-1 items-center justify-center">
							<Text className="text-white text-center">
								No exercises available
							</Text>
						</View>
					}
				/>
			</View>
		</View>
	);
}
