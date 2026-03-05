import { FlatList, View } from 'react-native';
import { Exercise } from '@/infrastructure/interfaces';
import { Separator, Text } from '@/components/atoms';
import { ExerciseItem } from '@/components/molecules';

type ExerciseListProps = {
	data: Exercise[] | undefined;
	onPress: (id: string, title: string) => void;
};

export const ExerciseList = ({ data, onPress }: ExerciseListProps) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<ExerciseItem
					exercise={item}
					onPress={() => onPress(item.id, item.title)}
				/>
			)}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={Separator}
			ListEmptyComponent={
				<View className="flex-1 items-center justify-center">
					<Text className="text-center">No exercises available</Text>
				</View>
			}
		/>
	);
};
