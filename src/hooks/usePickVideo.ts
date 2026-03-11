import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const usePickVideo = (
	onPicked?: (video: ImagePicker.ImagePickerAsset) => void
) => {
	const [video, setVideo] = useState<ImagePicker.ImagePickerAsset | null>(null);
	const [loadingVideo, setLoadingVideo] = useState(false);

	const requestPermission = async (type: 'camera' | 'library') => {
		const permission =
			type === 'camera'
				? await ImagePicker.requestCameraPermissionsAsync()
				: await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permission.granted) {
			Alert.alert(
				'Permission required',
				type === 'camera'
					? 'Camera access is required to record a video.'
					: 'Media library access is required to select a video.'
			);
			return false;
		}

		return true;
	};

	const pickVideo = async () => {
		try {
			const allowed = await requestPermission('library');
			if (!allowed) return;

			setLoadingVideo(true);

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['videos'],
				allowsEditing: true,
				quality: 1
			});

			if (!result.canceled) {
				const selected = result.assets[0];
				setVideo(selected);
				onPicked?.(selected);
			}
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'Something went wrong while selecting the video.');
		} finally {
			setLoadingVideo(false);
		}
	};

	const captureVideo = async () => {
		try {
			const allowed = await requestPermission('camera');
			if (!allowed) return;

			setLoadingVideo(true);

			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ['videos'],
				allowsEditing: true,
				quality: 1
			});

			if (!result.canceled) {
				const selected = result.assets[0];
				setVideo(selected);
				onPicked?.(selected);
			}
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'Something went wrong while recording the video.');
		} finally {
			setLoadingVideo(false);
		}
	};

	const openPicker = () => {
		Alert.alert('Select video', 'What would you like to do?', [
			{
				text: 'Record video',
				onPress: captureVideo
			},
			{
				text: 'Choose from gallery',
				onPress: pickVideo
			},
			{
				text: 'Cancel',
				style: 'cancel'
			}
		]);
	};

	return {
		video,
		loadingVideo,
		openPicker
	};
};
