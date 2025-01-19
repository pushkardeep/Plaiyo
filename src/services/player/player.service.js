import {setCurrentSong} from '../../redux/slices/player.slice';
import {setPlaying} from '../../redux/slices/playing.slice';
import SoundPlayer from 'react-native-sound-player';

export const playSong = async (songPath, dispatch, currentTime = 0) => {
  try {
    SoundPlayer.playUrl(`file://${songPath}`);
    SoundPlayer.seek(currentTime); // Seek to the current playback position
    dispatch(setPlaying(true));
  } catch (error) {
    console.log('Error in playing song', error.message);
    return {message: 'Something went wrong'};
  }
};

export const pauseSong = dispatch => {
  try {
    SoundPlayer.pause();
    dispatch(setPlaying(false));
  } catch (error) {
    console.log('Error in pausing song', error.message);
    return {message: 'Something went wrong'};
  }
};

export const stepForward = (song, songList, dispatch) => {
  if (!song || !songList) return;

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
  if (!song || !songList) return;

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

export const getCurrentTime = (isPlaying, setToState, time) => {
  const interval = setInterval(async () => {
    if (isPlaying) {
      const {currentTime, duration} = await SoundPlayer.getInfo();
      setToState(currentTime);
      if (currentTime >= duration) {
        clearInterval(interval);
      }
      return interval;
    } else {
      clearInterval(interval);
    }
  }, time);
};

export const getDuration = async stateToSet => {
  try {
    const {duration} = await SoundPlayer.getInfo();
    stateToSet(duration);
  } catch (error) {
    console.error('Error fetching duration:', error);
  }
};
