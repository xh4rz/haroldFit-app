import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface ScrollViewLayoutProps {
	children: ReactNode;
	bottomOffset?: number;
}

export const KeyboardScrollViewLayout = ({
	children,
	bottomOffset = 80
}: ScrollViewLayoutProps) => {
	return (
		<KeyboardAwareScrollView
			bottomOffset={bottomOffset}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{ flexGrow: 1 }}
		>
			{children}
		</KeyboardAwareScrollView>
	);
};
