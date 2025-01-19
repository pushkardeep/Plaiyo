import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icons, temt_1} from '../../utils/constants.utils';
import {
  stepForward,
  stepBackward,
  playSong,
  pauseSong,
  getCurrentTime,
  getDuration,
} from '../../services/player/player.service';
import {setRepeat, setShuffle} from '../../redux/slices/player.slice';

const Widget = () => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {isPlaying} = useSelector(state => state.playing);
  const {isRepeat, isShuffle} = useSelector(state => state.player);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const {songs} = useSelector(state => state.songs);
  const {currentSong} = useSelector(state => state.player);

  const handleRepeat = () => {
    if (isRepeat) {
      dispatch(setRepeat(false));
    } else {
      dispatch(setRepeat(true));
      if (isShuffle) {
        dispatch(setShuffle(false));
      }
    }
  };

  useEffect(() => {
    const interval = getCurrentTime(isPlaying, setCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
  }, [duration, currentTime]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      {/* Progress Bar */}
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

      {/* Content */}
      <View style={styles.content}>
        {/* Song Info */}
        <TouchableOpacity style={styles.songInfo}>
          <Image
            source={
              currentSong.coverImage
                ? {uri: `file://${currentSong.coverImage}`}
                : temt_1
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
              {currentSong.title || 'unknown'}
            </Text>
            <Text
              style={[
                styles.artistName,
                {color: isDarkMode ? '#B0B0B0' : '#666666'},
              ]}
              numberOfLines={1}>
              {currentSong.artist || 'unknown'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleRepeat}>
            {!isRepeat &&
              Icons.MaterialCommunityIcons.repeat(
                22,
                isDarkMode ? '#B0B0B0' : '#666666',
              )}

            {isRepeat && Icons.MaterialCommunityIcons.repeatOnce(22, '#7C4DFF')}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => stepBackward(currentSong, songs, dispatch)}>
            {Icons.AntDesign.stepbackward(
              17,
              isDarkMode ? '#FFFFFF' : '#BAA8ED',
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={() =>
              !isPlaying
                ? playSong(currentSong.songPath, dispatch, currentTime)
                : pauseSong(dispatch)
            }>
            <LinearGradient
              colors={['#7C4DFF', '#6200EA']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.playButtonGradient}>
              {!isPlaying && Icons.FontAwesome5.play(15, 'white')}
              {isPlaying && Icons.MaterialCommunityIcons.pause(24, 'white')}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => stepForward(currentSong, songs, dispatch)}>
            {Icons.AntDesign.stepforward(
              17,
              isDarkMode ? '#FFFFFF' : '#BAA8ED',
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
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
