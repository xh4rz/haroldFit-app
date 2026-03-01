import { ActivityIndicator, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { getExercises } from '@/modules/routine/services/exercise/getExercises';
import { ExerciseList } from '@/components/organism';
import { Text } from '@/components/atoms';

export default function AddExerciseScreen() {
	const router = useRouter();

	// const [selectedId, setSelectedId] = useState<string>();

	const { data, isPending } = useQuery({
		queryKey: ['exercises'],
		queryFn: getExercises
	});

	const handlePressExercise = (id: string, title: string) => {
		router.push({
			pathname: '/routine/create-routine/add-exercise/[id]',
			params: { id, title }
		});
	};

	if (isPending) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="white" />
				<Text className="mt-4">Loading exercices...</Text>
			</View>
		);
	}

	return (
		<View>
			{/* <View className="items-center justify-center py-4">
				<Text className="text-center text-lg font-bold">List Exercises</Text>
			</View> */}
			<ExerciseList data={data} onPress={handlePressExercise} />
		</View>
	);
}
