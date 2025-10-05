import { colors } from '@/constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function DashboardLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: 'black',
				tabBarActiveBackgroundColor: colors.secondary,
				animation: 'none',
				tabBarStyle: {
					backgroundColor: colors.secondary
				}
			}}
			backBehavior="order"
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: 'Home',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name="home"
							size={24}
							color={focused ? colors.primary : 'black'}
						/>
					)
				}}
			/>

			<Tabs.Screen
				name="training"
				options={{
					title: 'Training',
					headerShown: false,
					popToTopOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name="bulb1"
							size={24}
							color={focused ? colors.primary : 'black'}
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
							color={focused ? colors.primary : 'black'}
						/>
					)
				}}
			/>
		</Tabs>
	);
}
