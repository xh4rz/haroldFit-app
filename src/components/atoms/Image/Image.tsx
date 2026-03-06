import React from 'react';
import { StyleProp } from 'react-native';
import { ImageStyle, Image as RNImage, ImageContentFit } from 'expo-image';

type ImageProps = {
	url: string;
	contentFit?: ImageContentFit;
	imageScale?: number;
	transition?: number;
	style?: StyleProp<ImageStyle>;
};

export const Image = ({
	url,
	contentFit = 'cover',
	imageScale = 1,
	transition = 1000,
	style
}: ImageProps) => {
	return (
		<RNImage
			source={{
				uri: url
			}}
			contentFit={contentFit}
			transition={transition}
			style={[
				{ width: '100%', height: '100%', transform: [{ scale: imageScale }] },
				style
			]}
		/>
	);
};
