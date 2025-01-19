import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SoundPlayer from 'react-native-sound-player';
import {
  pauseSong,
  playSong,
  stepForward,
} from '../services/player/player.service';
import {setCurrentSong} from '../redux/slices/player.slice';

const SongUpdater = () => {
  const dispatch = useDispatch();

  // song list
  const {songs} = useSelector(state => state.songs);

  const {isPlaying} = useSelector(state => state.playing);
  const {isRepeat, isShuffle, currentSong} = useSelector(state => state.player);
  const {} = useSelector(state => state.player);

  useEffect(() => {
    const onFinishedPlaying = () => {
      // repeting the player on finish
      pauseSong(dispatch);
      SoundPlayer.seek(0);

      //   updating song as per given conditions
      if (isRepeat) {
        playSong(currentSong.songPath, dispatch);
      } else if (isShuffle) {
        playRandomSong();
      } else {
        stepForward(currentSong, songs, dispatch);
      }
    };

    const subscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      onFinishedPlaying,
    );

    return () => {
      subscription.remove();
    };
  }, [isRepeat, isShuffle, currentSong]);

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    dispatch(setCurrentSong(songs[randomIndex]));
    playSong(songs[randomIndex].songPath, dispatch);
  };

  return null;
};

export default SongUpdater;
