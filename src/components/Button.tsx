import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	TouchableOpacityProps
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	variant: 'primary' | 'secondary';
	loading?: boolean;
}

const variants = {
	primary: 'bg-primary',
	secondary: 'bg-secondary'
};

export const Button = ({
	title,
	variant,
	loading = false,
	className,
	...rest
}: ButtonProps) => {
	return (
		<TouchableOpacity
			className={`
            w-full h-12 rounded-lg items-center justify-center
            ${variants[variant]}
            ${loading ? 'opacity-60' : 'opacity-100'}
            ${className ?? ''}
        `}
			disabled={loading}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text className="text-white text-base font-bold">{title}</Text>
			)}
		</TouchableOpacity>
	);
};
