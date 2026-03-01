import axiosClient from '@/api/axiosClient';
import { ExerciseResponse } from '@/infrastructure/interfaces';
import { delay } from '@/utils';

export const getExerciseById = async (
	id: string
): Promise<ExerciseResponse | undefined> => {
	await delay(1000);
	try {
		const { data } = await axiosClient.get<ExerciseResponse>(
			`/exercises/${id}`
		);

		return data;
	} catch {
		throw new Error(`error get exercise by ${id}`);
	}
};
