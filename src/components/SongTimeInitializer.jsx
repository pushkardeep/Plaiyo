import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDuration} from '../redux/slices/player.slice';
import SoundPlayer from 'react-native-sound-player';

const SongTimeInitializer = () => {
  const dispatch = useDispatch();
  const {isPlaying} = useSelector(state => state.playing);
  const {currentSong} = useSelector(state => state.player);

  // Initialize the duration of the song
  const durationInitializer = async () => {
    try {
      const {duration} = await SoundPlayer.getInfo();
      dispatch(setDuration(duration));
    } catch (error) {
      console.error('Error fetching duration:', error);
    }
  };

  // Cleanup interval when isPlaying becomes false or song completes
  useEffect(() => {
    if (isPlaying && currentSong) {
      durationInitializer();
    }
  }, [isPlaying, currentSong]);

  return null;
};

export default SongTimeInitializer;

const styles = StyleSheet.create({});
