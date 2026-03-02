import { View } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoContentFit } from 'expo-video';
import { PauseIcon, PlayIcon } from 'phosphor-react-native';
import { IconButton, Video } from '@/components/atoms';

type VideoPlayerProps = {
	url: string;
	autoPlayLoop?: boolean;
	contentFit?: VideoContentFit;
};

export const VideoPlayer = ({
	url,
	autoPlayLoop = false,
	contentFit = 'fill'
}: VideoPlayerProps) => {
	const player = useVideoPlayer(url, (player) => {
		player.loop = autoPlayLoop;
		if (autoPlayLoop) player.play();
	});

	const { isPlaying } = useEvent(player, 'playingChange', {
		isPlaying: player.playing
	});

	const handleTogglePlay = () => (isPlaying ? player.pause() : player.play());

	return (
		<View className="w-full h-full">
			<Video player={player} contentFit={contentFit} />

			{autoPlayLoop && (
				<View className="absolute top-5 right-10">
					<IconButton
						size="sm"
						variant="secondary"
						icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
						onPress={handleTogglePlay}
					/>
				</View>
			)}
		</View>
	);
};
