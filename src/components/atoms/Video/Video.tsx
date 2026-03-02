import {
	VideoView as ExpoVideoView,
	VideoContentFit,
	VideoPlayer
} from 'expo-video';

type VideoProps = {
	player: VideoPlayer;
	contentFit?: VideoContentFit;
};

export const Video = ({ player, contentFit = 'fill' }: VideoProps) => (
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
);
