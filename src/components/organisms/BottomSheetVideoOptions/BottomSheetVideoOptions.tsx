import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '../BottomSheetModal';
import { AntDesign } from '@expo/vector-icons';
import {
	FileVideoIcon,
	ReceiptXIcon,
	VideoCameraIcon
} from 'phosphor-react-native';
import { Text } from '@/components/atoms';

interface Props {
	show: boolean;
	setShow: (value: boolean) => void;
	disabledVideo: boolean;
	selectVideo: () => void;
	captureVideo: () => void;
	removeVideo: () => void;
}

export const BottomSheetVideoOptions = ({
	show,
	setShow,
	disabledVideo,
	selectVideo,
	captureVideo,
	removeVideo
}: Props) => {
	const sections = [
		{
			title: 'Select video from gallery',
			icon: <FileVideoIcon color="white" />,
			onPress: selectVideo
		},
		{
			title: 'Record video',
			icon: <VideoCameraIcon color="white" />,
			onPress: captureVideo
		},
		{
			title: 'Remove video',
			icon: <ReceiptXIcon color="white" />,
			onPress: removeVideo,
			disabled: disabledVideo
		}
	];

	return (
		<BottomSheetModal title="Add Video" show={show} setShow={setShow}>
			<View className="m-6">
				{sections.map((i, index) => (
					<TouchableOpacity
						key={index}
						className="flex-row gap-6 bg-zinc-800 p-4 items-center"
						activeOpacity={0.3}
						onPress={() => {
							if (!i.disabled) {
								i.onPress();
								setShow(false);
							}
						}}
						style={{ opacity: i.disabled ? 0.4 : 1 }}
					>
						{i.icon}
						<Text className="text-white font-medium flex-1">{i.title}</Text>
						<AntDesign name="right" size={14} color="white" />
					</TouchableOpacity>
				))}
			</View>
		</BottomSheetModal>
	);
};
