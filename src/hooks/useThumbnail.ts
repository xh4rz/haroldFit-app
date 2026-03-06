import { useState, useEffect } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

export const useThumbnail = (videoUrl: string) => {
	const [thumbnail, setThumbnail] = useState<string>('');

	useEffect(() => {
		let isMounted = true;
		const generate = async () => {
			try {
				const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl);
				if (isMounted) setThumbnail(uri);
			} catch (e) {
				console.warn(e);
			}
		};

		generate();

		return () => {
			isMounted = false;
		};
	}, [videoUrl]);

	return thumbnail;
};
