import React, { ReactNode, useRef } from 'react';
import { ScrollView } from 'react-native';

interface ScrollViewLayoutProps {
	children: ReactNode;
	paddingBottom?: number;
	scrollToEnd?: boolean;
}

export const ScrollViewLayout = ({
	children,
	paddingBottom = 0,
	scrollToEnd = false
}: ScrollViewLayoutProps) => {
	const scrollViewRef = useRef<ScrollView>(null);

	return (
		<ScrollView
			ref={scrollViewRef}
			onContentSizeChange={() => {
				if (scrollToEnd) {
					scrollViewRef.current?.scrollToEnd({ animated: true });
				}
			}}
			contentContainerStyle={{
				flexGrow: 1,
				paddingBottom
			}}
			keyboardShouldPersistTaps="handled"
		>
			{children}
		</ScrollView>
	);
};
