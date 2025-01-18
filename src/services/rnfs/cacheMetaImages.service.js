import RNFS from 'react-native-fs';
import {FFmpegKit} from 'ffmpeg-kit-react-native';

export const cacheMetaImages = async filePath => {
  try {
    const outputImagePath = `${RNFS.CachesDirectoryPath}/${
      filePath.split('/').pop().split('.')[0]
    }_cover_image.png`;

    await RNFS.mkdir(RNFS.CachesDirectoryPath);

    const exists = await RNFS.exists(outputImagePath);

    if (!exists) {
      await FFmpegKit.executeAsync(
        `-i "${filePath}" -an -vcodec copy "${outputImagePath}"`,
      );
      return {coverImage: outputImagePath};
    }

    if (exists) {
      return {coverImage: outputImagePath};
    } else {
      console.log('Failed to extract cover image');
      return {coverImage: null};
    }
  } catch (error) {
    console.error('Error in extracting image ', error);
    return {coverImage: null};
  }
};
