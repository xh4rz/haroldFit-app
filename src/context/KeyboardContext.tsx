import React, { createContext, useMemo, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import {
	KeyboardProvider,
	KeyboardAvoidingView
} from 'react-native-keyboard-controller';

interface Props {
	children: ReactNode;
}

interface KeyboardContextType {
	enabledKeyboardAvoiding: boolean;
	setEnabledKeyboardAvoiding: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KeyboardContext = createContext<KeyboardContextType>({
	enabledKeyboardAvoiding: true,
	setEnabledKeyboardAvoiding: () => {}
});

export const KeyboardContextProvider = ({ children }: Props) => {
	const [enabledKeyboardAvoiding, setEnabledKeyboardAvoiding] = useState(true);

	const contextValue = useMemo(
		() => ({ enabledKeyboardAvoiding, setEnabledKeyboardAvoiding }),
		[enabledKeyboardAvoiding]
	);

	return (
		<KeyboardContext.Provider value={contextValue}>
			<KeyboardProvider>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					style={{ flex: 1 }}
					enabled={enabledKeyboardAvoiding}
				>
					{children}
				</KeyboardAvoidingView>
			</KeyboardProvider>
		</KeyboardContext.Provider>
	);
};
