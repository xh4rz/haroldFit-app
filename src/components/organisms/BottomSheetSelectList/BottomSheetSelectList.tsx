import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator } from '@/components/atoms';
import { SelectListItem } from '@/components/molecules';
import { BottomSheetModal } from '../BottomSheetModal';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type BottomSheetSelectListProps<T extends BaseSelectItem> = {
	title: string;
	data?: T[];
	show: boolean;
	setShow: (value: boolean) => void;
	selectedIds: number[];
	onChange: (ids: number[]) => void;
	imageScale?: number;
	multiple?: boolean;
	snapPoints?: string[] | number[];
};

export const BottomSheetSelectList = <T extends BaseSelectItem>({
	title,
	data,
	show,
	setShow,
	selectedIds,
	onChange,
	imageScale = 1,
	multiple = false,
	snapPoints
}: BottomSheetSelectListProps<T>) => {
	const insets = useSafeAreaInsets();

	const onPress = (id: number) => {
		if (!multiple) {
			onChange([id]);
			setShow(false);
			return;
		}

		const newIds = selectedIds.includes(id)
			? selectedIds.filter((i) => i !== id)
			: [...selectedIds, id];

		onChange(newIds);
	};

	return (
		<BottomSheetModal
			title={title}
			show={show}
			setShow={setShow}
			mode="list"
			snapPoints={snapPoints}
		>
			<BottomSheetFlatList
				data={data}
				keyExtractor={(item: T) => item.id.toString()}
				renderItem={({ item }: { item: T }) => (
					<SelectListItem
						item={item}
						selectedIds={selectedIds}
						onPress={onPress}
						multiple={multiple}
						imageScale={imageScale}
					/>
				)}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={{
					paddingBottom: insets.bottom + 20
				}}
			/>
		</BottomSheetModal>
	);
};
