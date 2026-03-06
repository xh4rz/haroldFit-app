import { TouchableOpacity, View } from 'react-native';
import { Image, Text } from '@/components/atoms';
import { Exercise } from '@/infrastructure/interfaces';
import { useThumbnail } from '@/hooks';

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

	const thumbnail = useThumbnail(exercise.video);

	return (
		<TouchableOpacity onPress={onPress} className="flex flex-row gap-4 p-4">
			<View className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
				<Image url={thumbnail} />
			</View>
			<View>
				<Text className="text-white">{exercise.title}</Text>
				<Text className="text-white/40">{exercise.primaryMuscle.name}</Text>
			</View>
		</TouchableOpacity>
	);
};
