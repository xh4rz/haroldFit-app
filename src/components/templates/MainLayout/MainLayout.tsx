import { ReactNode } from 'react';
import { View } from 'react-native';

interface TemplateLayoutProps {
	children: ReactNode;
	className?: string;
}

export const MainLayout = ({
	children,
	className = ''
}: TemplateLayoutProps) => {
	return <View className={`flex-1 ${className}`}>{children}</View>;
};
