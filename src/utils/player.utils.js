import {setRepeat, setShuffle} from '../redux/slices/player.slice';

import {
  resumeSong,
  pauseSong,
  playSong,
} from '../services/player/player.service';

export const handlePlayback = (isPlaying, isPaused, currentSong, dispatch) => {
  if (isPlaying) {
    if (isPaused) {
      resumeSong(dispatch);
    } else {
      pauseSong(dispatch);
    }
  } else {
    playSong(currentSong?.songPath, dispatch);
  }
};

export const handleRepeat = (isRepeat, isShuffle, dispatch) => {
  if (isRepeat) {
    dispatch(setRepeat(false));
  } else {
    dispatch(setRepeat(true));
    if (isShuffle) {
      dispatch(setShuffle(false));
    }
  }
};

export const handleShuffle = (isRepeat, isShuffle, dispatch) => {
  if (isShuffle) {
    dispatch(setShuffle(false));
  } else {
    dispatch(setShuffle(true));
    if (isRepeat) {
      dispatch(setRepeat(false));
    }
  }
};
