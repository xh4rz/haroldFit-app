import { colors } from '@/constants/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';

export default function TabsLayout() {
	const segments = useSegments();

	const hideTabs = [...segments].includes('create-routine');

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: 'white',
				tabBarActiveBackgroundColor: colors.secondary,
				animation: 'none',
				tabBarStyle: {
					backgroundColor: colors.secondary,
					display: hideTabs ? 'none' : 'flex'
				}
			}}
			backBehavior="order"
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name="home"
							size={24}
							color={focused ? colors.primary : 'white'}
						/>
					)
				}}
			/>

			<Tabs.Screen
				name="routine"
				options={{
					title: 'Routine',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="fitness-center"
							size={24}
							color={focused ? colors.primary : 'white'}
						/>
					)
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name="user"
							size={24}
							color={focused ? colors.primary : 'white'}
						/>
					)
				}}
			/>
		</Tabs>
	);
}
