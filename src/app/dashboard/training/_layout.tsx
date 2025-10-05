import { colors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function TrainingLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				animation: 'slide_from_right'
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Training' }}
			/>
		</Stack>
	);
}
