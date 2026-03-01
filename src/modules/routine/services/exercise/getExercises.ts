import axiosClient from '@/api/axiosClient';
import { delay } from '@/utils';
import { ExerciseResponse } from '@/infrastructure/interfaces';

export const getExercises = async () => {
	await delay(1000);
	try {
		const { data } = await axiosClient.get<ExerciseResponse[]>('/exercises');

		return data;
	} catch {
		throw new Error('error get exercises');
	}
};
