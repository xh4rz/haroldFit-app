import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/atoms';
import { VideoPlayer } from '../VideoPlayer';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseItemProps = {
	exercise: Exercise;
	onPress: () => void;
	// isSelected: boolean;
	// textColor: string;
};

export const ExerciseItem = ({
	exercise,
	onPress
	// isSelected,
	// textColor
}: ExerciseItemProps) => {
	// const isSelected = item.id === selectedId;
	// 	const color = isSelected ? colors.primary : 'white';
	return (
		<TouchableOpacity onPress={onPress} className="flex flex-row gap-4 p-4">
			<View className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
				<VideoPlayer url={exercise.video} contentFit="cover" />
			</View>
			<View>
				<Text className="text-white">{exercise.title}</Text>
				<Text className="text-white/40">{exercise.primaryMuscle.name}</Text>
			</View>
		</TouchableOpacity>
	);
};
