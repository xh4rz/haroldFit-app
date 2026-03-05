import { Text } from '@/components/atoms';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const LoadingView = ({ titleLoading }: { titleLoading: string }) => {
	return (
		<View className="flex-1 items-center justify-center">
			<ActivityIndicator size="large" color="white" />
			<Text className="mt-4">Loading {`${titleLoading}`}...</Text>
		</View>
	);
};
