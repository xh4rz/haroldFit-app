import { ScrollViewLayout } from '@/components/templates';
import { ExerciseCreateView } from '@/screens/ExerciseCreateView';

export default function ExerciseCreateScreen() {
	return (
		<ScrollViewLayout paddingBottom={20} scrollToEnd>
			<ExerciseCreateView />
		</ScrollViewLayout>
	);
}
