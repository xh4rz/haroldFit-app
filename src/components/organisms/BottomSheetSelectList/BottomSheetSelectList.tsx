import React, { useEffect } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator } from '@/components/atoms';
import { SelectListItem } from '@/components/molecules';
import { BottomSheetModalList } from '../BottomSheetModalList';
import { Keyboard } from 'react-native';

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
};

export const BottomSheetSelectList = <T extends BaseSelectItem>({
	title,
	data,
	show,
	setShow,
	selectedIds,
	onChange,
	imageScale = 1,
	multiple = false
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

	useEffect(() => {
		if (show) {
			const timeout = setTimeout(() => {
				Keyboard.dismiss();
			}, 300);
			return () => clearTimeout(timeout);
		}
	}, [show]);
	return (
		<BottomSheetModalList title={title} show={show} setShow={setShow}>
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
		</BottomSheetModalList>
	);
};
