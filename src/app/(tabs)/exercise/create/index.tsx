import { ScrollView } from 'react-native';
import { KeyboardLayout } from '@/components/templates';
import { ExerciseCreateView } from '@/screens/ExerciseCreateView';

export default function ExerciseCreateScreen() {
	return (
		<KeyboardLayout>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 100
				}}
				keyboardShouldPersistTaps="handled"
			>
				<ExerciseCreateView />
			</ScrollView>
		</KeyboardLayout>
	);
}
