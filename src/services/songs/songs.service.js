import {fetchAudioFiles} from '../rnfs/fetchAudioFiles.service';
import {extractMetaDataFromAudio} from '../ffmpeg/extractMetaDataFromAudio.service';
import {cacheMetaImages} from '../rnfs/cacheMetaImages.service';

import {setSongs} from '../../redux/slices/songs.slice';

const getSongs = async dispatch => {
  try {
    const {files, success} = await fetchAudioFiles();
    if (success) {
      for (const file of files) {
        if (file.isFile() && file.name.endsWith('.mp3')) {
          const songTextData = await extractMetaDataFromAudio(file.path);
          const songImagePath = await cacheMetaImages(file.path);
          const song = {
            id: `${Date.now()}`,
            songPath: file.path,
            ...songTextData,
            ...songImagePath,
          };
          // songs.push(songData);
          
          dispatch(setSongs(song));
        }
      }
      return {success: true};
    }

    return {success: false, message: 'No audio files found'};
  } catch (error) {
    console.log('Error in getting songs', error);
    return {success: false, error: error.message || 'Error in getting songs'};
  }
};

export {getSongs};
