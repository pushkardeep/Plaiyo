import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MusicControl, {Command} from 'react-native-music-control';
import {
  playSong,
  pauseSong,
  stepBackward,
  stepForward,
  getCurrentTime,
  getDuration,
} from '../services/player/player.service';
import SoundPlayer from 'react-native-sound-player';

const BgSongNotifee = () => {
  const dispatch = useDispatch();
  const {currentSong} = useSelector(state => state.player);
  const {isPlaying} = useSelector(state => state.playing);
  const {songs} = useSelector(state => state.songs);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = getCurrentTime(isPlaying, setCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && currentSong) {
      getDuration(setDuration);
    }
  }, [currentSong, isPlaying]);

  MusicControl.on(Command.play, () => {
    playSong(currentSong.songPath, dispatch, currentTime);
  });

  MusicControl.on(Command.pause, () => {
    pauseSong(dispatch);
  });

  MusicControl.on(Command.nextTrack, () => {
    pauseSong(dispatch);
    stepForward(currentSong, songs, dispatch);
  });

  MusicControl.on(Command.previousTrack, () => {
    pauseSong(dispatch);
    stepBackward(currentSong, songs, dispatch);
  });

  MusicControl.on(Command.seek, pos => {
    SoundPlayer.seek(pos);
    setCurrentTime(pos); // Update the current time when seeking
  });

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('seek', true);
    MusicControl.enableBackgroundMode(true);
  }, []);

  useEffect(() => {
    if (currentSong) {
      MusicControl.setNowPlaying({
        title: currentSong.title,
        artist: currentSong.artist,
        artwork: `file://${currentSong.coverImage}`,
        color: 0xffffff,
        duration: duration || 200,
        colorized: true,
      });
    }
  }, [currentSong, duration]);

  useEffect(() => {
    MusicControl.updatePlayback({
      state: isPlaying ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED,
      speed: 1,
      elapsedTime: currentTime, // Update elapsed time in playback controls
      volume: 10,
      maxVolume: 10,
    });
  }, [isPlaying, currentTime]);
};

export default BgSongNotifee;

const styles = StyleSheet.create({});
