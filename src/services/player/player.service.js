import {setCurrentSong} from '../../redux/slices/player.slice';
import {setPause, setPlaying} from '../../redux/slices/playing.slice';

import SoundPlayer from 'react-native-sound-player';
import {checkExists} from '../rnfs/rnfs.service';

export const playSong = async (songPath, dispatch) => {
  try {
    const {success, exists} = await checkExists(songPath);
    if (success && exists) {
      SoundPlayer.playUrl(`file://${songPath}`);
      dispatch(setPlaying(true));
    }
  } catch (error) {
    console.log('Error in playing song', error.message);
  }
};

export const resumeSong = dispatch => {
  SoundPlayer.resume();
  dispatch(setPause(false));
};

export const pauseSong = dispatch => {
  SoundPlayer.pause();
  dispatch(setPause(true));
};

export const stopPlayer = dispatch => {
  SoundPlayer.stop();
  dispatch(setPlaying(false));
};

export const stepForward = (song, songList, dispatch) => {
  // reseting the player for next song
  stopPlayer(dispatch);
  dispatch(setPause(false));

  const index = songList.findIndex(e => e.id === song.id);

  if (index === songList.length - 1) {
    dispatch(setCurrentSong(songList[0]));

    // for autoplay
    playSong(songList[0].songPath, dispatch);
  } else {
    dispatch(setCurrentSong(songList[index + 1]));

    // for autoplay
    playSong(songList[index + 1].songPath, dispatch);
  }
};

export const stepBackward = (song, songList, dispatch) => {
  // reseting the player for previous  song
  stopPlayer(dispatch);
  dispatch(setPause(false));

  const index = songList.findIndex(e => e.id === song.id);

  if (index === 0) {
    dispatch(setCurrentSong(songList[songList.length - 1]));

    // for autoplay
    playSong(songList[songList.length - 1].songPath, dispatch);
  } else {
    dispatch(setCurrentSong(songList[index - 1]));

    // for autoplay
    playSong(songList[index - 1].songPath, dispatch);
  }
};

export const getCurrentTime = (isPlaying, isPaused, setToState, time) => {
  let interval = null;

  if (isPlaying) {
    interval = setInterval(async () => {
      const {currentTime, duration} = await SoundPlayer.getInfo();
      setToState(currentTime);
    }, time);
  }

  return () => clearInterval(interval); // Return a cleanup function
};

export const getDuration = async (stateToSet, retries = 3, delay = 500) => {
  let attempt = 0;

  const fetchDuration = async () => {
    try {
      const {duration} = await SoundPlayer.getInfo();
      if (duration) {
        stateToSet(duration);
        return true;
      }
      throw new Error('Duration not available');
    } catch (error) {
      if (attempt < retries) {
        attempt++;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchDuration();
      } else {
        stateToSet(200);
        return false;
      }
    }
  };

  return fetchDuration();
};
