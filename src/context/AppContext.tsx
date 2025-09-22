import React, { ReactNode } from 'react';
import { ReactQueryContextProvider, ThemeContextProvider } from './';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	return (
		<ReactQueryContextProvider>
			<ThemeContextProvider>{children}</ThemeContextProvider>
		</ReactQueryContextProvider>
	);
}
