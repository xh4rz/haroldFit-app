import { View } from 'react-native';

interface TemplateLayoutProps {
	children: React.ReactNode;
	className?: string;
}

export const MainLayout = ({
	children,
	className = ''
}: TemplateLayoutProps) => {
	return <View className={`flex-1 ${className}`}>{children}</View>;
};
