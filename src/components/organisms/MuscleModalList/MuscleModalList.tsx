import React from 'react';
import { Image } from 'expo-image';
import { TouchableOpacity, View } from 'react-native';
import { Separator, Text } from '@/components/atoms';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModalList } from '../BottomSheetModalList';
import { CheckIcon } from 'phosphor-react-native';
import { colors } from '@/constants/colors';
import { Muscle } from '@/infrastructure/interfaces';

type MuscleListProps = {
	data: Muscle[] | undefined;
	onPress: (id: number) => void;
	showBottomSheetModal: boolean;
	setShowBottomSheetModal: (value: boolean) => void;
	idMuscle: number;
};

export const MuscleModalList = ({
	data,
	onPress,
	showBottomSheetModal,
	setShowBottomSheetModal,
	idMuscle
}: MuscleListProps) => {
	const insets = useSafeAreaInsets();
	return (
		<BottomSheetModalList
			title="Muscle Group"
			show={showBottomSheetModal}
			setShow={setShowBottomSheetModal}
		>
			<BottomSheetFlatList
				data={data}
				keyExtractor={(item: Muscle) => item.id}
				renderItem={({ item }: { item: Muscle }) => (
					<TouchableOpacity
						className="flex flex-row gap-4 p-2 items-center"
						onPress={() => onPress(item.id)}
					>
						<View className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
							<Image
								style={{
									width: '100%',
									height: '100%',
									transform: [{ scale: 1.2 }]
								}}
								source={item.imageUrl}
								contentFit="cover"
							/>
						</View>
						<Text className="flex-1">{item.name}</Text>

						{item.id === idMuscle && (
							<View className="w-16 items-center">
								<CheckIcon color={colors.secondary} />
							</View>
						)}
					</TouchableOpacity>
				)}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={{
					paddingBottom: insets.bottom + 20
				}}
			/>
		</BottomSheetModalList>
	);
};
