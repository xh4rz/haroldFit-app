import React, { ReactNode } from 'react';
import { ReactQueryProvider } from './ReactQueryContext';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	return (
		<ReactQueryProvider>
			{/* <AuthProvider> */}
			{/* <ThemeProvider> */}
			{children}
			{/* </ThemeProvider> */}
			{/* </AuthProvider> */}
		</ReactQueryProvider>
	);
}
