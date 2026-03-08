import React from 'react';
import { Checkbox as RNCheckbox } from 'expo-checkbox';
import { colors } from '@/constants/colors';

interface CheckboxProps {
	isChecked: boolean;
	onChange: (value: boolean) => void;
	className?: string;
}

export const Checkbox = ({
	isChecked,
	onChange,
	className = ''
}: CheckboxProps) => {
	return (
		<RNCheckbox
			value={isChecked}
			onValueChange={onChange}
			color={isChecked ? colors.primary : undefined}
			className={`${className}`}
		/>
	);
};
