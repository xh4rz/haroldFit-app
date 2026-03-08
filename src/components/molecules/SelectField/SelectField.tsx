import { TouchableOpacity, View } from 'react-native';
import { CaretRightIcon } from 'phosphor-react-native';
import { Text } from '@/components/atoms';

type SelectFieldProps = {
	label: string;
	value: string;
	error?: string;
	required?: boolean;
	onPress: () => void;
};

export const SelectField = ({
	label,
	value,
	error,
	required,
	onPress
}: SelectFieldProps) => {
	return (
		<TouchableOpacity
			className="flex flex-row items-center p-2 rounded-md"
			onPress={onPress}
		>
			<View className="flex-1">
				<Text>
					{label} {required && '*'}
				</Text>

				<Text className={error ? 'text-red-500' : 'text-secondary'}>
					{error || value}
				</Text>
			</View>

			<CaretRightIcon size={20} color="white" />
		</TouchableOpacity>
	);
};
