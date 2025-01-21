import RNFS from 'react-native-fs';

export const deleteFile = async filePath => {
  try {
    await RNFS.unlink(filePath);
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message || 'Error deleting file'};
  }
};
