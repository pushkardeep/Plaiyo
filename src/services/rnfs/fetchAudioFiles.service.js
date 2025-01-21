import RNFS from 'react-native-fs';

export const fetchAudioFiles = async () => {
  try {
    const files = [];
    const musicDir = `${RNFS.ExternalStorageDirectoryPath}/Music`;

    if (!RNFS.exists(musicDir)) {
      return {success: false, error: 'Music folder not found'};
    }

    const data = await RNFS.readDir(musicDir);

    for (const file of data) {
      if (file.isFile() && file.name.endsWith('.mp3')) {
        files.push(file);
      }
    }

    return {success: true, files};
  } catch (error) {
    console.error('Error reading music:', error);
    return {success: false, error: error.message || 'Error reading music'};
  }
};
