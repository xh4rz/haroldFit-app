import React, { ReactNode } from 'react';
import {
	KeyboardContextProvider,
	ReactQueryContextProvider,
	ThemeContextProvider
} from './';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	return (
		<KeyboardContextProvider>
			<ReactQueryContextProvider>
				<ThemeContextProvider>{children}</ThemeContextProvider>
			</ReactQueryContextProvider>
		</KeyboardContextProvider>
	);
}
