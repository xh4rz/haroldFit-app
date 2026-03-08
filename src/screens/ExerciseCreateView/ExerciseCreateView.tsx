import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard, View } from 'react-native';
import {
	ExerciseCreateFormData,
	exerciseCreateFormSchema
} from '@/modules/exercise/exerciseCreateFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Button, Input, Separator } from '@/components/atoms';
import { SignInIcon } from 'phosphor-react-native';
import { ExerciseInstructions, SelectField } from '@/components/molecules';
import { colors } from '@/constants/colors';
import { BottomSheetSelectList } from '@/components/organisms';
import { getEquipments } from '@/modules/routine/services/equipment';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMuscles } from '@/modules/routine/services/muscle';

export const ExerciseCreateView = () => {
	const router = useRouter();
	const { login } = useAuthStore();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		watch,
		getValues,
		formState: { errors }
	} = useForm<ExerciseCreateFormData>({
		resolver: zodResolver(exerciseCreateFormSchema),
		mode: 'onChange',
		defaultValues: {
			title: '',
			equipmentId: 0,
			primaryMuscleId: 0,
			secondaryMuscleIds: [],
			instruction: [],
			file: {}
		}
	});

	const [showModalEquipment, setShowModalEquipment] = useState(false);

	const [showModalPrimaryMuscle, setShowModalPrimaryMuscle] = useState(false);

	const [showModalSecondaryMuscle, setShowModalSecondaryMuscle] =
		useState(false);

	const onLogin = async (data: ExerciseCreateFormData) => {
		// setLoading(true);
		// clearErrors('root');
		// try {
		// 	await login(data.email, data.password);
		// } catch {
		// 	setError('root', {
		// 		type: 'custom',
		// 		message: 'Invalid credentials'
		// 	});
		// } finally {
		// 	setLoading(false);
		// }
	};

	// useEffect(() => {
	// 	const subscription = watch(() => {
	// 		if (errors.root) {
	// 			clearErrors('root');
	// 		}
	// 	});

	// 	return () => subscription.unsubscribe();
	// }, [watch, errors.root, clearErrors]);

	const queryClient = useQueryClient();

	const { data: dataEquipments } = useQuery({
		queryKey: ['equipments'],
		queryFn: getEquipments,
		initialData: () => queryClient.getQueryData(['equipments'])
	});

	const { data: dataMuscles } = useQuery({
		queryKey: ['muscles'],
		queryFn: getMuscles,
		initialData: () => queryClient.getQueryData(['muscles'])
	});

	const handlePressEquipment = () => {
		Keyboard.dismiss();
		setShowModalEquipment(true);
	};

	const handlePressPrimaryMuscle = () => {
		Keyboard.dismiss();
		setShowModalPrimaryMuscle(true);
	};

	const handlePressSecondaryMuscle = () => {
		Keyboard.dismiss();
		setShowModalSecondaryMuscle(true);
	};

	const equipmentId = watch('equipmentId');

	const primaryMuscleId = watch('primaryMuscleId');

	const secondaryMuscleIds = watch('secondaryMuscleIds');

	const equipmentText =
		dataEquipments?.find((i) => i.id === equipmentId)?.name || 'Select';

	const primaryMuscleText =
		dataMuscles?.find((i) => i.id === primaryMuscleId)?.name || 'Select';

	const secondaryMuscleText =
		dataMuscles
			?.filter((i) => secondaryMuscleIds?.includes(i.id))
			.map((i) => i.name)
			.join(', ') || 'Select';

	const handleChangeSelectSingle =
		(field: 'equipmentId' | 'primaryMuscleId') => (ids: number[]) => {
			setValue(field, ids[0] ?? 0);
			clearErrors(field);
		};

	const handleChangeSelectMultiple =
		(field: 'secondaryMuscleIds') => (ids: number[]) => {
			setValue(field, ids);
			clearErrors(field);
		};

	const equipmentError = errors.equipmentId?.message;

	const primaryMuscleError = errors.primaryMuscleId?.message;

	console.log({ values: getValues() });

	return (
		<View className="flex-1 m-6">
			<Input
				autoFocus
				required
				autoCapitalize="none"
				control={control}
				name="title"
				placeholder="Enter Exercise Name *"
				error={errors.title}
				disabled={loading}
				variant="line"
			/>

			<SelectField
				required
				label="Equipment"
				value={equipmentText}
				error={equipmentError}
				onPress={handlePressEquipment}
			/>

			<Separator />

			<SelectField
				required
				label="Primary Muscle"
				value={primaryMuscleText}
				error={primaryMuscleError}
				onPress={handlePressPrimaryMuscle}
			/>

			<Separator />

			<SelectField
				label="Secondary Muscle (optional)"
				value={secondaryMuscleText}
				onPress={handlePressSecondaryMuscle}
			/>

			<Separator />

			<ExerciseInstructions control={control} errors={errors.instruction} />

			<Separator />

			<Button
				title="Save"
				variant="outline"
				onPress={handleSubmit(onLogin)}
				iconLeft={<SignInIcon color={colors.primary} />}
				className="mt-5"
				loading={loading}
			/>

			<BottomSheetSelectList
				title="Equipments"
				data={dataEquipments}
				show={showModalEquipment}
				setShow={setShowModalEquipment}
				selectedIds={equipmentId ? [equipmentId] : []}
				onChange={handleChangeSelectSingle('equipmentId')}
				imageScale={0.6}
			/>

			<BottomSheetSelectList
				title="Primary Muscles"
				data={dataMuscles}
				show={showModalPrimaryMuscle}
				setShow={setShowModalPrimaryMuscle}
				selectedIds={primaryMuscleId ? [primaryMuscleId] : []}
				onChange={handleChangeSelectSingle('primaryMuscleId')}
				imageScale={1.2}
			/>

			<BottomSheetSelectList
				multiple
				title="Secondary Muscles"
				data={dataMuscles}
				show={showModalSecondaryMuscle}
				setShow={setShowModalSecondaryMuscle}
				selectedIds={secondaryMuscleIds ?? []}
				onChange={handleChangeSelectMultiple('secondaryMuscleIds')}
				imageScale={1.2}
			/>
		</View>
	);
};
