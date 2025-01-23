import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  stopPlayer,
  playSong,
  stepForward,
} from '../services/player/player.service';

import {setCurrentSong} from '../redux/slices/player.slice';
import {setPause, setPlaying} from '../redux/slices/playing.slice';

import {checkExists} from '../services/rnfs/rnfs.service';

import SoundPlayer from 'react-native-sound-player';

const SongManager = () => {
  const dispatch = useDispatch();

  // song list
  const {songs} = useSelector(state => state.songs);

  // player configs
  const {isRepeat, isShuffle, currentSong, queueSongs} = useSelector(
    state => state.player,
  );

  const playRandomSong = () => {
    const randomIndex = Math.floor(
      Math.random() *
        (queueSongs.length > 0 ? queueSongs.length : songs.length),
    );

    dispatch(
      setCurrentSong(
        queueSongs.length > 0 ? queueSongs[randomIndex] : songs[randomIndex],
      ),
    );
    playSong(
      queueSongs.length > 0
        ? queueSongs[randomIndex].songPath
        : songs[randomIndex].songPath,
      dispatch,
    );
  };

  const checkSongExist = async () => {
    const {success, exists} = await checkExists(currentSong?.songPath);
    if (success) {
      if (!exists) {
        dispatch(setCurrentSong(null));
      }
    } else {
      dispatch(setCurrentSong(null));
    }
  };

  useEffect(() => {
    const onFinishedPlaying = () => {
      stopPlayer(dispatch);
      dispatch(setPause(false));

      //   updating song as per given conditions
      if (isRepeat) {
        playSong(currentSong.songPath, dispatch);
      } else if (isShuffle) {
        playRandomSong();
      } else {
        stepForward(
          currentSong,
          queueSongs.length > 0 ? queueSongs : songs,
          dispatch,
        );
      }
    };

    const subscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      onFinishedPlaying,
    );

    return () => {
      subscription.remove();
    };
  }, [isRepeat, isShuffle, currentSong, queueSongs]);

  useEffect(() => {
    dispatch(setPlaying(false));
    dispatch(setPause(false));
  }, []);

  useEffect(() => {
    if (!currentSong) return;
    checkSongExist();
  }, [currentSong]);

  return null;
};

export default SongManager;
