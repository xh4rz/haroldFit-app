import { KeyboardScrollViewLayout } from '@/components/templates';
import { ExerciseCreateView } from '@/screens/ExerciseCreateView';

export default function ExerciseCreateScreen() {
	return (
		<KeyboardScrollViewLayout paddingBottom={20} scrollToEnd>
			<ExerciseCreateView />
		</KeyboardScrollViewLayout>
	);
}
