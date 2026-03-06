import {
	VideoView as ExpoVideoView,
	VideoContentFit,
	VideoPlayer
} from 'expo-video';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type VideoProps = {
	player: VideoPlayer;
	contentFit?: VideoContentFit;
};

export const Video = ({ player, contentFit = 'fill' }: VideoProps) => {
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, []);

	return (
		<Animated.View style={{ flex: 1, opacity }}>
			<ExpoVideoView
				style={{
					width: '100%',
					height: '100%'
				}}
				player={player}
				nativeControls={false}
				contentFit={contentFit}
				surfaceType="textureView"
			/>
		</Animated.View>
	);
};
