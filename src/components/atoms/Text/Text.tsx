import { Text as RNText, TextProps } from 'react-native';

export const Text = ({
	children,
	className,
	...rest
}: TextProps & { className?: string }) => {
	return (
		<RNText className={`text-primary-theme ${className}`} {...rest}>
			{children}
		</RNText>
	);
};
