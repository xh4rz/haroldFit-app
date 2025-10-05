import { Text, View } from 'react-native';

export default function TrainingScreen() {
	return (
		<View className="flex-1 bg-theme">
			<View className="flex-1 justify-center items-center px-5">
				<Text className="text-3 font-bold text-primary-theme text-4xl text-center">
					Bienvenido al entrenamiento
				</Text>
			</View>
		</View>
	);
}
