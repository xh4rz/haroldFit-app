import { FlatList, View } from 'react-native';
import { ExerciseResponse } from '@/infrastructure/interfaces';
import { Separator, Text } from '@/components/atoms';
import { ExerciseItem } from '@/components/molecules';

type Props = {
	data: ExerciseResponse[] | undefined;
	onPress: (id: string, title: string) => void;
};

export const ExerciseList = ({ data, onPress }: Props) => {
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
