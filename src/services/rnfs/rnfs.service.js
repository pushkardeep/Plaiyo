import RNFS from 'react-native-fs';

export const deleteFile = async filePath => {
  try {
    const {success, exists} = await checkExists(filePath);
    if (success) {
      if (exists) {
        await RNFS.unlink(filePath);
        return {success: true};
      } else {
        return {success: true};
      }
    }
    return {success: false};
  } catch (error) {
    return {success: false, error: error.message || 'Error deleting file'};
  }
};

export const checkExists = async filePath => {
  try {
    const fileExists = await RNFS.exists(filePath);
    return {
      success: true,
      exists: fileExists,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Error checking file existence',
    };
  }
};
