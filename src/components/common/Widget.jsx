import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Text,
  View,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import {
  getDuration,
  stepForward,
  stepBackward,
  getCurrentTime,
} from '../../services/player/player.service';

import {handlePlayback, handleRepeat} from '../../utils/player.utils';
import {Icons, temt_2} from '../../utils/constants.utils';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Widget = ({callback}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const translateY = useSharedValue('100%');

  const {songs} = useSelector(state => state.songs);
  const {isPlaying, isPaused} = useSelector(state => state.playing);
  const {isRepeat, isShuffle, currentSong, queueSongs} = useSelector(
    state => state.player,
  );

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const cleanup = getCurrentTime(isPlaying, isPaused, setCurrentTime, 1000);
    return cleanup;
  }, [isPlaying, currentSong, isPaused]);

  useEffect(() => {
    if (isPlaying && currentSong) {
      getDuration(setDuration);
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (duration) {
      setProgress((currentTime / duration) * 100);
    } else {
      setProgress(0);
    }
  }, [duration, currentTime, currentSong]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    translateY.value = withSpring('0%', {damping: 17});
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyles,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: isDarkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
            },
          ]}>
          <View
            style={[
              styles.progress,
              {
                backgroundColor: isDarkMode ? '#7C4DFF' : '#6200EA',
                width: `${progress}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.songInfo} onPress={callback}>
          <Image
            source={
              currentSong?.coverImage
                ? {uri: `file://${currentSong.coverImage}`}
                : temt_2
            }
            style={styles.albumArt}
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.songTitle,
                {color: isDarkMode ? '#FFFFFF' : '#000000'},
              ]}
              numberOfLines={1}>
              {currentSong?.title || 'unknown'}
            </Text>
            <Text
              style={[
                styles.artistName,
                {color: isDarkMode ? '#B0B0B0' : '#666666'},
              ]}
              numberOfLines={1}>
              {currentSong?.artist || 'unknown'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleRepeat(isRepeat, isShuffle, dispatch)}>
            {!isRepeat &&
              Icons.MaterialCommunityIcons.repeat(
                22,
                isDarkMode ? '#B0B0B0' : '#666666',
              )}

            {isRepeat && Icons.MaterialCommunityIcons.repeatOnce(22, '#7C4DFF')}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() =>
              stepBackward(
                currentSong,
                queueSongs?.length > 0 ? queueSongs : songs,
                dispatch,
              )
            }>
            {Icons.AntDesign.stepbackward(
              17,
              isDarkMode ? '#FFFFFF' : '#BAA8ED',
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={() =>
              handlePlayback(isPlaying, isPaused, currentSong, dispatch)
            }>
            <LinearGradient
              colors={['#7C4DFF', '#6200EA']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.playButtonGradient}>
              {isPlaying
                ? isPaused
                  ? Icons.FontAwesome5.play(15, 'white')
                  : Icons.MaterialCommunityIcons.pause(24, 'white')
                : Icons.FontAwesome5.play(15, 'white')}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() =>
              stepForward(
                currentSong,
                queueSongs?.length > 0 ? queueSongs : songs,
                dispatch,
              )
            }>
            {Icons.AntDesign.stepforward(
              17,
              isDarkMode ? '#FFFFFF' : '#BAA8ED',
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
    overflow: 'hidden',
  },

  progressContainer: {
    width: '100%',
    height: 2,
    backgroundColor: 'transparent',
  },
  progressBar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  songInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%',
  },
  albumArt: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  songTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  artistName: {
    fontSize: 12,
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    padding: 8,
    borderRadius: 20,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#6200EA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 4,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Widget;
