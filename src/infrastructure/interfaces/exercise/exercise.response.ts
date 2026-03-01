export interface ExerciseResponse {
	id: string;
	title: string;
	instruction: string[];
	video: string;
	equipment: OptionItem;
	primaryMuscle: OptionItem;
	secondaryMuscles?: OptionItem[];
}

export interface OptionItem {
	id: number;
	name: string;
}
