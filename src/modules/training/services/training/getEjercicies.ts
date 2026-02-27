import axiosClient from '@/api/axiosClient';
import { ExerciseResponse } from '@/infrastructure/interfaces';
import { delay } from '@/utils';

export const getEjercicies = async () => {
	await delay(1000);
	try {
		const { data } = await axiosClient.get<ExerciseResponse[]>('/exercises');

		return data;
	} catch {
		throw new Error('error get exercises');
	}
};
