import { Stack, useLocalSearchParams } from 'expo-router';
import { ExerciseDetailView } from '@/screens/ExerciseDetailView';

export default function ExerciseRoute() {
	const { title } = useLocalSearchParams<{ id: string; title: string }>();

	return (
		<>
			<Stack.Screen
				options={{
					title: title || 'Exercise'
				}}
			/>
			<ExerciseDetailView />
		</>
	);
}
