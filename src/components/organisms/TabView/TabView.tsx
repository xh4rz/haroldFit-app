import * as React from 'react';
import { colors } from '@/constants/colors';
import { useWindowDimensions, View } from 'react-native';
import {
	TabView as TabViewReactNavigation,
	TabBar,
	Route,
	SceneRendererProps
} from 'react-native-tab-view';

interface TabViewProps {
	routes: Route[];
	renderScene: (
		props: SceneRendererProps & { route: Route }
	) => React.ReactNode;
	renderHeader?: () => React.ReactNode;
}

export const TabView = ({
	routes,
	renderScene,
	renderHeader
}: TabViewProps) => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);

	return (
		<TabViewReactNavigation
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={(props) => (
				<View>
					<TabBar
						{...props}
						activeColor={colors.secondary}
						inactiveColor="#999"
						indicatorStyle={{ backgroundColor: colors.secondary }}
						style={{ backgroundColor: 'transparent', elevation: 0 }}
					/>
					{renderHeader?.()}
				</View>
			)}
		/>
	);
};
