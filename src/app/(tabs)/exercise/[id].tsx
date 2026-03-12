import { Alert, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/atoms';
import { deleteExerciseById } from '@/modules/exercise/services/exercise';
import { ExerciseDetailView } from '@/screens/ExerciseDetailView';
import { useQueryClient } from '@tanstack/react-query';

export default function ExerciseRoute() {
	const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

	const router = useRouter();

	const queryClient = useQueryClient();

	const deleteExercise = () => {
		Alert.alert(
			'Delete Exercise',
			'Are you sure you want to delete this exercise?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: async () => {
						try {
							await deleteExerciseById(id);

							await queryClient.invalidateQueries({
								queryKey: ['exercises']
							});

							router.back();
						} catch {}
					}
				}
			]
		);
	};
	return (
		<>
			<Stack.Screen
				options={{
					title: title || 'Exercise',
					headerRight: () => (
						<View>
							<Button
								title="Delete"
								variant="secondary"
								fullWidth={false}
								textClassName="text-secondary font-bold"
								onPress={deleteExercise}
							/>
						</View>
					)
				}}
			/>
			<ExerciseDetailView />
		</>
	);
}
