import React from 'react';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { BarbellIcon, PlusIcon } from 'phosphor-react-native';
import { Button } from '@/components';

export default function CreateRoutineScreen() {
	const router = useRouter();
	return (
		<View className="flex-1 justify-center items-center gap-10 bg-theme p-5">
			<View className=" justify-center items-center gap-4">
				<BarbellIcon size={32} color="white" />
				<Text className="text-white">
					Get started by adding an exercise to your routine.
				</Text>
			</View>

			<Button
				title="Add Exercise"
				variant="secondary"
				onPress={() => router.push('/training/create-routine/add-exercise')}
				iconLeft={<PlusIcon size={18} />}
			/>
		</View>
	);
}
