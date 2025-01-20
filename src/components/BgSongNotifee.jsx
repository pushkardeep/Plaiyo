import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MusicControl, {Command} from 'react-native-music-control';
import SoundPlayer from 'react-native-sound-player';

import {
  playSong,
  pauseSong,
  stepBackward,
  stepForward,
  getCurrentTime,
  getDuration,
} from '../services/player/player.service';

import {handlePlayback} from '../utils/player.utils';

const BgSongNotifee = () => {
  const dispatch = useDispatch();

  const {songs} = useSelector(state => state.songs);
  const {isPlaying, isPaused} = useSelector(state => state.playing);
  const {currentSong, queueSongs} = useSelector(state => state.player);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const cleanup = getCurrentTime(isPlaying, isPaused, setCurrentTime, 1000);
    return cleanup;
  }, [isPlaying, currentSong, isPaused]);

  useEffect(() => {
    if (isPlaying && currentSong) {
      getDuration(setDuration);
    }
  }, [currentSong, isPlaying]);

  MusicControl.on(Command.play, () => {
    handlePlayback(isPlaying, isPaused, currentSong, dispatch);
  });

  MusicControl.on(Command.pause, () => {
    pauseSong(dispatch);
  });

  MusicControl.on(Command.nextTrack, () => {
    stepForward(
      currentSong,
      queueSongs?.length > 0 ? queueSongs : songs,
      dispatch,
    );
  });

  MusicControl.on(Command.previousTrack, () => {
    stepBackward(
      currentSong,
      queueSongs?.length > 0 ? queueSongs : songs,
      dispatch,
    );
  });

  MusicControl.on(Command.seek, pos => {
    SoundPlayer.seek(pos);
    setCurrentTime(pos);
  });

  // initializing the music notifee function
  useEffect(() => {
    if (currentSong) {
      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);
      MusicControl.enableControl('nextTrack', true);
      MusicControl.enableControl('previousTrack', true);
      MusicControl.enableControl('seek', true);
      MusicControl.enableBackgroundMode(true);
    }
  }, [currentSong]);

  // initializing the music notifee
  useEffect(() => {
    if (currentSong) {
      MusicControl.setNowPlaying({
        title: currentSong.title,
        artist: currentSong.artist,
        artwork: `file://${currentSong?.coverImage}`,
        color: 0xffffff,
        duration: duration || 200,
        colorized: true,
      });
    }
  }, [currentSong, duration]);

  // updating the music notifee
  useEffect(() => {
    if (currentSong) {
      MusicControl.updatePlayback({
        state: isPlaying
          ? isPaused
            ? MusicControl.STATE_PAUSED
            : MusicControl.STATE_PLAYING
          : MusicControl.STATE_PAUSED,
        speed: 1,
        elapsedTime: currentTime || 0,
        volume: 10,
        maxVolume: 10,
      });
    }
  }, [isPlaying, isPaused, currentTime, currentSong]);
};

export default BgSongNotifee;
