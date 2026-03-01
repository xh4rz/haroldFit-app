import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text } from '@/components/atoms';

export default function TrainingScreen() {
	const router = useRouter();

	return (
		<View className="gap-4 p-5">
			<Text className="text-white">Routines</Text>

			<Button
				title="New Routine"
				bg="bg-zinc-800"
				fullWidth={false}
				onPress={() => router.push('/routine/create-routine')}
				iconLeft={
					<MaterialCommunityIcons name="file-document-plus-outline" size={24} />
				}
			/>
		</View>
	);
}
