import { ExerciseDetailView } from '@/screens/ExerciseDetailView';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function ExerciseRoute() {
	const { title } = useLocalSearchParams<{ title: string }>();

	return (
		<>
			<Stack.Screen options={{ title: title || 'Exercise' }} />
			<ExerciseDetailView />
		</>
	);
}
