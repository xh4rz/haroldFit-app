import { Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components';

export default function TrainingScreen() {
	const router = useRouter();
	return (
		<View className="flex-1 gap-4 bg-theme p-5">
			<Text className="text-white">Routines</Text>

			<Button
				title="New Routine"
				bg="bg-zinc-800"
				fullWidth={false}
				onPress={() => router.push('/training/create-routine')}
				iconLeft={
					<MaterialCommunityIcons name="file-document-plus-outline" size={24} />
				}
			/>
		</View>
	);
}
