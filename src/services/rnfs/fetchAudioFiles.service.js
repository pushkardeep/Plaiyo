import RNFS from 'react-native-fs';

export const fetchAudioFiles = async () => {
  try {
    const musicDir = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    const files = await RNFS.readDir(musicDir);

    return {success: true, files};
  } catch (error) {
    console.error('Error reading music:', error);
    return {success: false, error: error.message || 'Error reading music'};
  }
};
