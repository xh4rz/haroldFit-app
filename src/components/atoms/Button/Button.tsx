import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View
} from 'react-native';
import { ReactElement, cloneElement } from 'react';
import { IconProps } from 'phosphor-react-native';

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	loading?: boolean;
	iconLeft?: ReactElement<IconProps>;
	bg?: string;
	fullWidth?: boolean;
	textClassName?: string;
}

const variants = {
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	outline: 'bg-transparent border border-primary'
};

const textVariants = {
	primary: 'text-white',
	secondary: 'text-white',
	outline: 'text-primary'
};

const sizes = {
	sm: { text: 'text-sm' },
	md: { text: 'text-base' },
	lg: { text: 'text-lg' },
	xl: { text: 'text-xl' }
};

export const Button = ({
	title,
	variant = 'primary',
	size = 'md',
	loading = false,
	iconLeft,
	bg,
	fullWidth = true,
	textClassName,
	className,
	disabled,
	...rest
}: ButtonProps) => {
	return (
		<TouchableOpacity
			className={`
				flex-row gap-2 justify-center items-center
				p-2 rounded-lg
				${fullWidth ? 'w-full' : 'self-start'}
				${bg ?? variants[variant]}
				${disabled || loading ? 'opacity-60' : 'opacity-100'}
				${className ?? ''}
			`}
			disabled={disabled || loading}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<>
					{iconLeft && (
						<View>
							{cloneElement(iconLeft, {
								color: iconLeft.props.color ?? 'white'
							})}
						</View>
					)}

					<Text
						className={`
							${textVariants[variant]}
							${sizes[size].text}
							${textClassName ?? ''}
						`}
					>
						{title}
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
};
