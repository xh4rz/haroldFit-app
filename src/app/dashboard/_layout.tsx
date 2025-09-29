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
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
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
