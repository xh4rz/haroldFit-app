import { z } from 'zod';
import * as ImagePicker from 'expo-image-picker';

export const exerciseCreateFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Exercise name is required' })
		.min(6, { message: 'Exercise name must be at least 6 characters' }),

	equipmentId: z.number().min(1, {
		message: 'Equipment is required'
	}),

	primaryMuscleId: z.number().min(1, {
		message: 'Primary muscle is required'
	}),

	secondaryMuscleIds: z.array(z.number()).optional(),

	// instruction: z
	// 	.array(
	// 		z.string().min(1, {
	// 			message: 'Add at least one instruction to the exercise'
	// 		})
	// 	)
	// 	.min(1, { message: 'At least one instruction is required' }),

	instruction: z
		.array(
			z.object({
				text: z
					.string()
					.min(1, { message: 'Add at least one instruction to the exercise' })
			})
		)
		.min(1, { message: 'At least one instruction is required' }),

	file: z
		.custom<ImagePicker.ImagePickerAsset>()
		.refine((file) => !!file, {
			message: 'Video is required'
		})
		.refine((file) => file?.mimeType?.startsWith('video/'), {
			message: 'File must be a video'
		})
		.refine((file) => (file?.fileSize ?? 0) <= 2 * 1024 * 1024, {
			message: 'Video must be smaller than 2MB'
		})
});

export type ExerciseCreateFormData = z.infer<typeof exerciseCreateFormSchema>;
