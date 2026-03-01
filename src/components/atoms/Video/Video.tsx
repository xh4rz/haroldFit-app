import { VideoView as ExpoVideoView, VideoPlayer } from 'expo-video';

type VideoProps = {
	player: VideoPlayer;
};

export const Video = ({ player }: VideoProps) => (
	<ExpoVideoView
		style={{
			width: '100%',
			height: '100%'
		}}
		player={player}
		nativeControls={false}
		contentFit="cover"
		surfaceType="textureView"
	/>
);
