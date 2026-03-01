import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/atoms';
import { VideoPlayer } from '@/components/molecules';
import { ExerciseResponse } from '@/infrastructure/interfaces';

type ExerciseItemProps = {
	exercise: ExerciseResponse;
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
			<View
				style={{
					height: 50,
					width: 50,
					borderRadius: 50,
					overflow: 'hidden'
				}}
			>
				{/* <VideoView url={exercise.video} /> */}
				<VideoPlayer url={exercise.video} />
			</View>

			<View>
				<Text className="text-white">{exercise.title}</Text>
				<Text className="text-white/40">{exercise.primaryMuscle.name}</Text>
			</View>
		</TouchableOpacity>
	);
};
