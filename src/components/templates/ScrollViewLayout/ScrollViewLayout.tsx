import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';

interface ScrollViewLayoutProps {
	children: ReactNode;
	paddingBottom?: number;
}

export const ScrollViewLayout = ({
	children,
	paddingBottom = 0
}: ScrollViewLayoutProps) => {
	return (
		<ScrollView
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
