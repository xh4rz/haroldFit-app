import React from 'react';
import { View } from 'react-native';
import { Button, Modal } from '@/components/atoms';

interface Props {
	exerciseTitle: string;
	visible: boolean;
	setVisible: (value: boolean) => void;
	onDelete: () => void;
	loading?: boolean;
}

export const DeleteExerciseModal = ({
	exerciseTitle,
	visible,
	setVisible,
	onDelete,
	loading
}: Props) => {
	return (
		<Modal
			title="Delete Exercise"
			description="Are you sure you want to delete the"
			highlight={exerciseTitle}
			visible={visible}
			setVisible={setVisible}
		>
			<View className="flex gap-3">
				<Button
					size="sm"
					title="Delete Exercise"
					variant="error"
					onPress={onDelete}
					loading={loading}
				/>

				<Button
					size="sm"
					title="Cancel"
					variant="outline"
					onPress={() => setVisible(false)}
				/>
			</View>
		</Modal>
	);
};
