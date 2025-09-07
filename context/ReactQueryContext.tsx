import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface QueryProviderProps {
	children: ReactNode;
}

// Crear el cliente de React Query con configuración personalizada
const reactQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Tiempo que los datos se consideran "frescos"
			staleTime: 5 * 60 * 1000, // 5 minutos

			// Tiempo que los datos se mantienen en caché
			gcTime: 10 * 60 * 1000, // 10 minutos

			// Número de reintentos en caso de error
			retry: 2,

			// Configuraciones de refetch
			refetchOnWindowFocus: false,
			refetchOnReconnect: true
		},
		mutations: {
			retry: 1
		}
	}
});

export function ReactQueryProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={reactQueryClient}>
			{children}
		</QueryClientProvider>
	);
}

// Exportar el cliente por si lo necesitas
export { reactQueryClient };
