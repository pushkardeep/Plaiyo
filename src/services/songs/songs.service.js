import {fetchAudioFiles} from '../rnfs/fetchAudioFiles.service';
import {extractMetaDataFromAudio} from '../ffmpeg/extractMetaDataFromAudio.service';
import {cacheMetaImages} from '../rnfs/cacheMetaImages.service';

import {setSongs, removeSongs} from '../../redux/slices/songs.slice';
import {deleteFile} from '../rnfs/rnfs.service';
import {removeDeletedFavouriteSongs} from '../../redux/slices/favorite.slice';
import {removeDeletedPlaylistSongs} from '../../redux/slices/playlist.slice';

// Main function to initialize songs
const initializeSongs = async (existingSongs, dispatch) => {
  try {
    const {files: audioFiles, success, error} = await fetchAudioFiles();

    if (!success) {
      console.error('Error fetching audio files:', error);
      return {success: false, message: error || 'No audio files found'};
    }

    if (existingSongs.length === 0) {
      console.log('Fetching all songs for the first time');
      const addAllResult = await addAllSongs(dispatch, audioFiles);
      if (!addAllResult.success) {
        console.error('Error adding all songs:', addAllResult.error);
        return addAllResult;
      }
    } else {
      const updateResult = await updateNewSongs(
        existingSongs,
        audioFiles,
        dispatch,
      );
      if (!updateResult.success) {
        console.error('Error updating new songs:', updateResult.error);
        return updateResult;
      }

      const removeResult = await removeDeletedSongs(
        existingSongs,
        audioFiles,
        dispatch,
      );
      if (!removeResult.success) {
        console.error('Error removing deleted songs:', removeResult.error);
        return removeResult;
      }
    }

    return {success: true};
  } catch (error) {
    console.error('Error initializing songs:', error);
    return {success: false, error: error.message || 'Error initializing songs'};
  }
};

// Add all songs when the app starts
const addAllSongs = async (dispatch, audioFiles) => {
  try {
    for (const audioFile of audioFiles) {
      const songMetadata = await extractMetaDataFromAudio(audioFile.path);
      const songImage = await cacheMetaImages(audioFile.path);

      const song = {
        id: `${Date.now()}`,
        songPath: audioFile.path,
        ...songMetadata,
        ...songImage,
      };

      dispatch(setSongs(song));
    }

    return {success: true};
  } catch (error) {
    console.error('Error adding all songs:', error);
    return {
      success: false,
      error: error.message || 'Error adding all songs',
    };
  }
};

// Update songs by adding new files
const updateNewSongs = async (existingSongs, audioFiles, dispatch) => {
  try {
    const existingSongPaths = existingSongs.map(song => song.songPath);

    const newAudioFiles = audioFiles.filter(audioFile => {
      return !existingSongPaths.includes(audioFile.path);
    });

    if (newAudioFiles.length === 0) return {success: true};

    for (const newAudioFile of newAudioFiles) {
      const songMetadata = await extractMetaDataFromAudio(newAudioFile.path);
      const songImage = await cacheMetaImages(newAudioFile.path);

      const newSong = {
        id: `${Date.now()}`,
        songPath: newAudioFile.path,
        ...songMetadata,
        ...songImage,
      };

      dispatch(setSongs(newSong));
    }

    return {success: true};
  } catch (error) {
    console.error('Error updating new songs:', error);
    return {
      success: false,
      error: error.message || 'Error updating new songs',
    };
  }
};

// Remove songs that are no longer available
const removeDeletedSongs = async (existingSongs, audioFiles, dispatch) => {
  try {
    // Paths of files available in the music directory
    const currentAudioPaths = audioFiles.map(audioFile => audioFile.path);

    const songsToRemove = existingSongs.filter(song => {
      return !currentAudioPaths.includes(song.songPath);
    });

    if (songsToRemove.length === 0) return {success: true};

    dispatch(removeSongs(songsToRemove));
    dispatch(removeDeletedFavouriteSongs(songsToRemove));
    dispatch(removeDeletedPlaylistSongs(songsToRemove));

    const deletionResults = await Promise.allSettled(
      songsToRemove.map(async song => {
        const response = await deleteFile(song.coverImage);
        if (!response.success) {
          console.error(
            `Failed to delete file at ${song.coverImage}:`,
            response.error,
          );
        }
        return response;
      }),
    );

    const failedDeletions = deletionResults.filter(
      result => result.status === 'rejected' || !result.value?.success,
    );
    if (failedDeletions.length > 0) {
      console.warn('Some cache files could not be deleted:', failedDeletions);
    }

    return {success: true};
  } catch (error) {
    console.error('Error removing deleted songs:', error);
    return {
      success: false,
      error: error.message || 'Error removing deleted songs',
    };
  }
};

export {initializeSongs};
