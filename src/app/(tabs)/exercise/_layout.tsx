import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useThemeColors } from '@/hooks';
import { Button } from '@/components/atoms';
import { View } from 'react-native';

export default function ExerciseLayout() {
	const router = useRouter();

	const theme = useThemeColors();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: 'white'
				},
				animation: 'slide_from_right',
				contentStyle: {
					backgroundColor: theme.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerShown: true,
					title: 'Exercises',
					headerRight: () => (
						<View>
							<Button
								title="Create"
								variant="outline"
								fullWidth={false}
								textClassName="text-secondary font-bold"
								onPress={() =>
									router.push({
										pathname: '/exercise/create'
									})
								}
							/>
						</View>
					)
				}}
			/>

			<Stack.Screen
				name="create/index"
				options={{ headerShown: true, title: 'Create Exercise' }}
			/>
		</Stack>
	);
}
