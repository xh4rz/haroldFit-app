import { ReactElement, cloneElement } from 'react';
import {
	ActivityIndicator,
	TouchableOpacity,
	TouchableOpacityProps,
	View
} from 'react-native';
import { IconProps } from 'phosphor-react-native';

interface IconButtonProps extends TouchableOpacityProps {
	icon: ReactElement<IconProps>;
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	loading?: boolean;
}

const variants = {
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	outline: 'bg-transparent'
};

const sizes = {
	sm: 'w-8 h-8',
	md: 'w-10 h-10',
	lg: 'w-12 h-12',
	xl: 'w-14 h-14'
};

const sizesIcon = {
	sm: 20,
	md: 24,
	lg: 28,
	xl: 32
};

export const IconButton = ({
	icon,
	variant = 'primary',
	size = 'md',
	loading = false,
	className,
	disabled,
	...rest
}: IconButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			className={`
				items-center justify-center rounded-full
				${sizes[size]}
				${variants[variant]}
			    ${disabled || loading ? 'opacity-60' : 'opacity-100'}
				${className ?? ''}
			`}
			disabled={disabled || loading}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<View>
					{cloneElement(icon, {
						size: icon.props.size ?? sizesIcon[size],
						color:
							(icon.props.color ?? ['primary', 'secondary'].includes(variant))
								? 'white'
								: 'black'
					})}
				</View>
			)}
		</TouchableOpacity>
	);
};
