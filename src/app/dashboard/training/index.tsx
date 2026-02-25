import { colors } from '@/constants/colors';
import { useState } from 'react';
import { Separator } from '../../../components/Separator';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type ItemData = {
	id: string;
	title: string;
};

const DATA: ItemData[] = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item'
	}
].concat(
	Array.from({ length: 100 }, (_, index) => ({
		id: `bd7acbea-c1b1-46c2-aed5-3ad53abb28ba-${index}`,
		title: `Item ${index + 1}`
	}))
);

type ItemProps = {
	item: ItemData;
	onPress: () => void;
	isSelected: boolean;
	textColor: string;
};

const Item = ({ item, onPress, isSelected, textColor }: ItemProps) => (
	<TouchableOpacity
		onPress={onPress}
		className={`p-4 ${isSelected ? 'bg-purple-950' : 'bg-zinc-800'}`}
	>
		<Text style={[{ color: textColor }]}>{item.title}</Text>
	</TouchableOpacity>
);

export default function TrainingScreen() {
	const [selectedId, setSelectedId] = useState<string>();

	const renderItem = ({ item }: { item: ItemData }) => {
		const isSelected = item.id === selectedId;
		const color = isSelected ? colors.primary : 'white';

		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.id)}
				isSelected={isSelected}
				textColor={color}
			/>
		);
	};

	return (
		<View className="flex-1 bg-theme">
			<View className="flex-1">
				{/* Header fijo arriba */}
				<View className="items-center justify-center py-4">
					<Text className="text-white text-center text-lg font-bold">
						Lista de ejercicios
					</Text>
				</View>

				{/* FlatList sin ListHeaderComponent */}
				<FlatList
					data={DATA}
					renderItem={renderItem}
					ItemSeparatorComponent={Separator}
					ListEmptyComponent={
						<View className="flex-1 items-center justify-center">
							<Text className="text-white text-center">
								No hay entrenamientos disponibles
							</Text>
						</View>
					}
				/>
			</View>
		</View>
	);
}
