import React, { ReactNode, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface ScrollViewLayoutProps {
	children: ReactNode;
	paddingBottom?: number;
	scrollToEnd?: boolean;
}

export const KeyboardScrollViewLayout = ({
	children,
	paddingBottom = 0,
	scrollToEnd = false
}: ScrollViewLayoutProps) => {
	const scrollViewRef =
		useRef<React.ComponentRef<typeof KeyboardAwareScrollView>>(null);

	return (
		<KeyboardAwareScrollView
			ref={scrollViewRef}
			onContentSizeChange={() => {
				if (scrollToEnd) {
					scrollViewRef.current?.scrollToEnd({ animated: true });
				}
			}}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{ flexGrow: 1, paddingBottom }}
		>
			{children}
		</KeyboardAwareScrollView>
	);
};
