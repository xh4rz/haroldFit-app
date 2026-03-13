import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, View } from 'react-native';
import {
	ExerciseCreateFormData,
	exerciseCreateFormSchema
} from '@/modules/exercise/exerciseCreateFormSchema';
import { Button, Input, Separator } from '@/components/atoms';
import {
	ExerciseInstructions,
	ExerciseVideoUpload,
	SelectField
} from '@/components/molecules';
import { BottomSheetSelectList } from '@/components/organisms';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMuscles } from '@/modules/exercise/services/muscle';
import { usePickVideo } from '@/hooks';
import { postExercise } from '@/modules/exercise/services/exercise';
import { setFormError } from '@/utils';

export const ExerciseCreateView = () => {
	const router = useRouter();

	const navigation = useNavigation();

	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		watch,
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
			file: undefined
		}
	});

	const [loading, setLoading] = useState(false);

	const [showModalEquipment, setShowModalEquipment] = useState(false);

	const [showModalPrimaryMuscle, setShowModalPrimaryMuscle] = useState(false);

	const [showModalSecondaryMuscle, setShowModalSecondaryMuscle] =
		useState(false);

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

	const { openPicker, video, loadingVideo } = usePickVideo((video) => {
		setValue('file', video, { shouldValidate: true });
		clearErrors('file');
	});

	const onSaveExercise = async (data: ExerciseCreateFormData) => {
		setLoading(true);

		try {
			const formData = new FormData();

			formData.append('title', data.title);
			formData.append('equipmentId', String(data.equipmentId));
			formData.append('primaryMuscleId', String(data.primaryMuscleId));

			if (data.secondaryMuscleIds) {
				formData.append(
					'secondaryMuscleIds',
					JSON.stringify(data.secondaryMuscleIds)
				);
			}

			const instructions = data.instruction.map((i) => i.text);
			formData.append('instruction', JSON.stringify(instructions));

			if (data.file) {
				formData.append('file', {
					uri: data.file.uri,
					name: data.file.fileName,
					type: data.file.mimeType
				} as any);
			}

			await postExercise(formData);

			await queryClient.invalidateQueries({
				queryKey: ['exercises']
			});

			router.back();
		} catch (error) {
			setFormError(setError, error);
		} finally {
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					title="Save"
					variant="secondary"
					fullWidth={false}
					textClassName="text-secondary font-bold"
					onPress={handleSubmit(onSaveExercise)}
					loading={loading}
				/>
			)
		});
	}, [loading]);

	return (
		<View className="m-6">
			<ExerciseVideoUpload
				videoUri={video?.uri ?? ''}
				openPicker={openPicker}
				loading={loadingVideo}
				error={errors.file}
			/>

			<Input
				required
				autoCapitalize="none"
				control={control}
				name="title"
				placeholder="Enter Exercise Name *"
				error={errors.title}
				variant="line"
			/>

			<SelectField
				required
				label="Equipment"
				value={equipmentText}
				error={equipmentError}
				onPress={() => setShowModalEquipment(true)}
			/>

			<Separator />

			<SelectField
				required
				label="Primary Muscle"
				value={primaryMuscleText}
				error={primaryMuscleError}
				onPress={() => setShowModalPrimaryMuscle(true)}
			/>

			<Separator />

			<SelectField
				label="Secondary Muscle (optional)"
				value={secondaryMuscleText}
				onPress={() => setShowModalSecondaryMuscle(true)}
			/>

			<Separator />

			<ExerciseInstructions control={control} error={errors.instruction} />

			<Separator />

			{errors.root && (
				<Text className="text-red-500 mt-2">{errors.root.message}</Text>
			)}

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
