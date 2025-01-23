import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Text,
  View,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import TopColor from '../components/common/TopColor';
import MiddleColor from '../components/common/MiddleColor';
import BottomColor from '../components/common/BottomColor';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import {
  removeFromFavorites,
  updateFavorites,
} from '../redux/slices/favorite.slice';

import {
  getDuration,
  stepBackward,
  stepForward,
  getCurrentTime,
} from '../services/player/player.service';

import {
  handlePlayback,
  handleRepeat,
  handleShuffle,
} from '../utils/player.utils';

import {Icons, temt_2} from '../utils/constants.utils';

import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import SoundPlayer from 'react-native-sound-player';

const Player = ({setOpenState}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const translateY = useSharedValue('100%');

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageExists, setIsImageExists] = useState(false);

  const {songs} = useSelector(state => state.songs);
  const {favorites} = useSelector(state => state.favorites);
  const {isPlaying, isPaused} = useSelector(state => state.playing);
  const {isRepeat, isShuffle, currentSong, queueSongs} = useSelector(
    state => state.player,
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const checkImageExists = async path => {
    const {success, exists} = await checkExists(path);
    if (success) {
      if (exists) {
        setIsImageExists(true);
      } else {
        setIsImageExists(false);
      }
    } else {
      setIsImageExists(false);
    }
  };

  const onUnMount = () => {
    translateY.value = withTiming('100%', {}, isFinished => {
      if (isFinished) {
        runOnJS(setOpenState)(false);
      }
    });
  };

  useEffect(() => {
    if (!currentSong?.coverImage) return setIsImageExists(false);
    checkImageExists(currentSong?.coverImage);
  }, [currentSong]);

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
    translateY.value = withSpring('0%', {damping: 17});
  }, []);

  useEffect(() => {
    setIsFavorite(
      favorites?.some(favorite => favorite?.id === currentSong?.id),
    );
  }, [currentSong, isFavorite, favorites]);

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyles,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.backIcon} onPress={onUnMount}>
          {Icons.EvilIcons.down(35, isDarkMode ? 'white' : '#7150D0')}
        </TouchableOpacity>

        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              isImageExists
                ? {uri: `file://${currentSong?.coverImage}`}
                : temt_2
            }
          />
          <Image
            style={styles.imageShadow}
            resizeMode="cover"
            source={
              currentSong?.coverImage
                ? {uri: `file://${currentSong?.coverImage}`}
                : temt_2
            }
          />
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text
              style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}
              numberOfLines={1}>
              {currentSong?.title || 'unknown'}
            </Text>
            <Text
              style={[styles.artist, {color: isDarkMode ? 'white' : 'black'}]}
              numberOfLines={1}>
              {currentSong?.artist || 'unknown'}
            </Text>
          </View>

          {/* heart  */}
          <TouchableOpacity
            onPress={() =>
              isFavorite
                ? dispatch(removeFromFavorites(currentSong))
                : dispatch(updateFavorites([currentSong]))
            }>
            {isFavorite
              ? Icons.AntDesign.heartFilled(24, '#FF5858')
              : Icons.AntDesign.heart(24, isDarkMode ? 'white' : 'black')}
          </TouchableOpacity>
        </View>

        <Slider
          style={styles.slider}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor={isDarkMode ? 'white' : '#AE92FF'}
          minimumTrackTintColor="#7B57E4"
          maximumTrackTintColor="#C4C4C4"
          onSlidingComplete={newPosition => {
            SoundPlayer.seek(newPosition);
          }}
        />

        <Text style={[styles.time, {color: isDarkMode ? 'white' : '#7150D0'}]}>
          {`${Math.floor(duration / 60)}:${Math.floor(duration % 60)
            .toString()
            .padStart(2, '0')}`}
        </Text>

        {/* controlls  */}
        <View style={styles.controlsContainer}>
          {/* shuffle  */}
          <TouchableOpacity
            onPress={() => handleShuffle(isRepeat, isShuffle, dispatch)}>
            {Icons.Ionicons.shuffle(29, isShuffle ? '#8572B8' : '#BAA8ED')}
          </TouchableOpacity>

          {/* stepBackward  */}
          <TouchableOpacity
            onPress={() =>
              stepBackward(
                currentSong,
                queueSongs?.length > 0 ? queueSongs : songs,
                dispatch,
              )
            }>
            {Icons.AntDesign.stepbackward(30, '#BAA8ED')}
          </TouchableOpacity>

          {/* pause , play  */}
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={() =>
              handlePlayback(isPlaying, isPaused, currentSong, dispatch)
            }>
            <LinearGradient
              colors={['#7150D0', '#AE92FF']}
              style={styles.linearGradient}>
              {isPlaying
                ? isPaused
                  ? Icons.Ionicons.play(30, 'white')
                  : Icons.Ionicons.pause(30, 'white')
                : Icons.Ionicons.play(30, 'white')}
            </LinearGradient>

            {/* shadow  */}
            <LinearGradient
              colors={['#7150D0', '#AE92FF']}
              style={styles.linearGradientShadow}></LinearGradient>
          </TouchableOpacity>

          {/* stepforward  */}
          <TouchableOpacity
            onPress={() =>
              stepForward(
                currentSong,
                queueSongs?.length > 0 ? queueSongs : songs,
                dispatch,
              )
            }>
            {Icons.AntDesign.stepforward(30, '#BAA8ED')}
          </TouchableOpacity>

          {/* repeat  */}
          <TouchableOpacity
            onPress={() => handleRepeat(isRepeat, isShuffle, dispatch)}>
            {!isRepeat && Icons.MaterialCommunityIcons.repeat(26, '#BAA8ED')}
            {isRepeat && Icons.MaterialCommunityIcons.repeatOnce(26, '#8572B8')}
          </TouchableOpacity>
        </View>
      </View>

      <TopColor
        additionalStyles={{left: '0%', transform: 'translate(-0%, -0%)'}}
      />
      <MiddleColor />
      <BottomColor
        additionalStyles={{left: '100%', transform: 'translate(-100%, -0%)'}}
      />
    </Animated.View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 25,
    paddingVertical: 55,
  },

  backIcon: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  imgContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: 15,
  },

  imageShadow: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
    zIndex: 0,
    filter: 'blur(15px)',
    position: 'absolute',
    top: '120%',
    left: '50%',
    transform: 'translate(-50%, -120%)',
  },

  infoContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    paddingHorizontal: 10,
  },

  title: {
    width: 250,
    fontSize: 20,
    fontWeight: 'bold',
  },

  artist: {
    fontSize: 12,
    opacity: 0.6,
  },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },

  linearGradient: {
    borderRadius: 50,
    padding: 18,
    zIndex: 1,
  },

  linearGradientShadow: {
    zIndex: 0,
    borderRadius: 50,
    padding: 30,
    filter: 'blur(15px)',
    position: 'absolute',
    top: '150%',
    left: '80%',
    transform: 'translate(-80%, -150%)',
  },

  slider: {
    marginTop: 60,
  },

  time: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: -5,
    alignSelf: 'flex-end',
  },
});
