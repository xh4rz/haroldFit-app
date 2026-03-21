import { useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';

export const useKeyboard = () => {
	const inputRefs = useRef<TextInput[]>([]);

	const registerInput = (index: number, ref: TextInput | null) => {
		if (ref) inputRefs.current[index] = ref;
	};

	const removeInput = (index: number) => {
		inputRefs.current.splice(index, 1);
	};

	const openKeyboard = (index: number) => {
		inputRefs.current[index]?.focus();
	};

	const closeKeyboard = () => {
		Keyboard.dismiss();
	};

	return {
		registerInput,
		removeInput,
		openKeyboard,
		closeKeyboard
	};
};
