import { useVideoPlayer, VideoView as VideoViewExpo } from 'expo-video';

export const VideoView = ({ url }: { url: string }) => {
	const player = useVideoPlayer(url, (player) => {
		player.loop = false;
	});
	return (
		<VideoViewExpo
			style={{ height: '100%', width: '100%' }}
			player={player}
			nativeControls={false}
			contentFit="cover"
			surfaceType="textureView" // 👈 ESTA es la clave
		/>
	);
};
