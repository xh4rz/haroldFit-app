import { Stack, useLocalSearchParams } from 'expo-router';
import { AddExerciseDetail } from '@/screens/AddExerciseDetail';

export default function AddExerciseRoute() {
	const { title } = useLocalSearchParams<{ id: string; title: string }>();

	return (
		<>
			<Stack.Screen options={{ title: title || 'Exercise' }} />
			<AddExerciseDetail />
		</>
	);
}
