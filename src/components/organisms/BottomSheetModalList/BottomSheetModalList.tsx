import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef
} from 'react';
import {
	BottomSheetBackdrop,
	BottomSheetModal as BottomSheetModalGorhom
} from '@gorhom/bottom-sheet';
import { useThemeColors } from '@/hooks';
import { colors } from '@/constants/colors';
import { Separator, Text } from '@/components/atoms';

interface BottomSheetProps {
	title: string;
	show: boolean;
	setShow: (value: boolean) => void;
	children: ReactNode;
}

export const BottomSheetModalList = ({
	title,
	show,
	setShow,
	children
}: BottomSheetProps) => {
	const theme = useThemeColors();

	const bottomSheetModalRef = useRef<BottomSheetModalGorhom>(null);

	useEffect(() => {
		bottomSheetModalRef.current?.[show ? 'present' : 'dismiss']();
	}, [show]);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'black'
				}}
			/>
		),
		[]
	);

	const snapPoints = useMemo(() => ['60%', '80%'], []);

	return (
		<BottomSheetModalGorhom
			ref={bottomSheetModalRef}
			onDismiss={() => setShow(false)}
			backdropComponent={renderBackdrop}
			backgroundStyle={{
				backgroundColor: theme.backgroundCard
			}}
			handleIndicatorStyle={{
				backgroundColor: colors.primary
			}}
			snapPoints={snapPoints}
			enableDynamicSizing={false}
		>
			<Text className="text-lg text-center m-5">{title}</Text>
			<Separator />
			{children}
		</BottomSheetModalGorhom>
	);
};
