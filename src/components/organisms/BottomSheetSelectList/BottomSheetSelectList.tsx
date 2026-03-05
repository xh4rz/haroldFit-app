import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator } from '@/components/atoms';
import { SelectListItem } from '@/components/molecules';
import { BottomSheetModalList } from '../BottomSheetModalList';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type BottomSheetSelectListProps<T extends BaseSelectItem> = {
	title: string;
	data: T[] | undefined;
	onPress: (id: number) => void;
	show: boolean;
	setShow: (value: boolean) => void;
	idSelected: number;
	imageScale?: number;
};

export const BottomSheetSelectList = <T extends BaseSelectItem>({
	title,
	data,
	onPress,
	show,
	setShow,
	idSelected,
	imageScale = 1
}: BottomSheetSelectListProps<T>) => {
	const insets = useSafeAreaInsets();

	return (
		<BottomSheetModalList title={title} show={show} setShow={setShow}>
			<BottomSheetFlatList
				data={data}
				keyExtractor={(item: T) => item.id}
				renderItem={({ item }: { item: T }) => (
					<SelectListItem
						item={item}
						onPress={onPress}
						idSelected={idSelected}
						imageScale={imageScale}
					/>
				)}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={{
					paddingBottom: insets.bottom + 20
				}}
			/>
		</BottomSheetModalList>
	);
};
