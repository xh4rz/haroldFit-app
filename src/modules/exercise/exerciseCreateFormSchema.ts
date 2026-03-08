import { z } from 'zod';

export const exerciseCreateFormSchema = z.object({
	title: z
		.string()
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
		.object({
			uri: z.string(),
			name: z.string(),
			type: z.string()
		})
		.refine((file) => file.type.startsWith('video/'), {
			message: 'File must be a video'
		})
});

export type ExerciseCreateFormData = z.infer<typeof exerciseCreateFormSchema>;
