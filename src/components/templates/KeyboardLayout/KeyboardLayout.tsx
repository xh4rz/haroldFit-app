import { ReactNode, useCallback } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';

interface AuthLayoutProps {
	children: ReactNode;
}

export const KeyboardLayout = ({ children }: AuthLayoutProps) => {
	useFocusEffect(
		useCallback(() => {
			Keyboard.dismiss();
			const timer = setTimeout(() => {}, 100);
			return () => clearTimeout(timer);
		}, [])
	);
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{children}
		</KeyboardAvoidingView>
	);
};
