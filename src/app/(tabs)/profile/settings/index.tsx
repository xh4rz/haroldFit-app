import { Separator } from '@/components/Separator';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import {
	SectionList,
	SectionListData,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

const sections: SectionListData<{
	id: number;
	title: string;
	icon: React.ReactNode;
	href: Href;
}>[] = [
	{
		title: 'Account',
		data: [
			{
				id: 1,
				title: 'Profile',
				icon: <AntDesign name="user" size={20} color="white" />,
				href: '/'
			},
			{
				id: 2,
				title: 'Account',
				icon: <AntDesign name="profile" size={20} color="white" />,
				href: '/'
			}
		]
	},
	{
		title: 'Appearance',
		data: [
			{
				id: 3,
				title: 'Theme',
				icon: <Feather name="moon" size={20} color="white" />,
				href: '/profile/settings/theme'
			}
		]
	},
	{
		title: 'Support',
		data: [
			{
				id: 4,
				title: 'Help',
				icon: <AntDesign name="question" size={20} color="white" />,
				href: '/'
			}
		]
	}
];

export default function SettingsScreen() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-theme">
			<SectionList
				sections={sections}
				keyExtractor={(item, index) => item.id.toString() + index}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="flex-row gap-6 bg-zinc-800 p-4 items-center"
						activeOpacity={0.3}
						onPress={() => router.navigate(item.href)}
					>
						{item.icon}
						<Text className="text-white font-medium flex-1">{item.title}</Text>
						<AntDesign name="right" size={14} color="white" />
					</TouchableOpacity>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<Text className="text-primary-theme opacity-50 my-2 mx-2">
						{title}
					</Text>
				)}
				ItemSeparatorComponent={() => <Separator />}
				ListFooterComponent={() => (
					<Text className="text-primary-theme opacity-50 my-2 text-center">
						Versión 1.0.0
					</Text>
				)}
			/>
		</View>
	);
}
