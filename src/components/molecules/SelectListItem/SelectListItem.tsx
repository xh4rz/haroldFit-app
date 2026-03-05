import React from 'react';
import { Text } from '@/components/atoms';
import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { CheckIcon } from 'phosphor-react-native';
import { TouchableOpacity, View } from 'react-native';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type SelectListItemProps<T extends BaseSelectItem> = {
	item: T;
	onPress: (id: number) => void;
	idSelected: number;
	imageScale?: number;
};

export const SelectListItem = <T extends BaseSelectItem>({
	item,
	idSelected,
	onPress,
	imageScale = 1
}: SelectListItemProps<T>) => {
	const isSelected = item.id === idSelected;

	return (
		<TouchableOpacity
			className="flex flex-row gap-4 p-2 items-center"
			onPress={() => onPress(item.id)}
		>
			<View className="w-[50px] h-[50px] rounded-[50px] overflow-hidden bg-white">
				<Image
					style={{
						width: '100%',
						height: '100%',
						transform: [{ scale: imageScale }]
					}}
					source={item.imageUrl}
					contentFit="cover"
				/>
			</View>
			<Text className="flex-1">{item.name}</Text>
			{isSelected && (
				<View className="w-16 items-center">
					<CheckIcon color={colors.secondary} />
				</View>
			)}
		</TouchableOpacity>
	);
};
