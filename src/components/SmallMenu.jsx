import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {Icons} from '../utils/constants.utils';

import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromFavorites,
  updateFavorites,
} from '../redux/slices/favorite.slice';

import {setIsSmallMenuOpen, setSmallMenuTarget} from '../redux/slices/ui.slice';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  clamp,
} from 'react-native-reanimated';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const SmallMenu = () => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const {favorites} = useSelector(state => state.favorites);
  const {smallMenuTarget} = useSelector(state => state.ui);
  const [isPresent, setIsPresent] = useState(false);

  const backgroundOpacity = useSharedValue(0);
  const translateY = useSharedValue('100%');

  const updateFavoriteList = () => {
    if (!smallMenuTarget) return;
    isPresent
      ? dispatch(removeFromFavorites(smallMenuTarget))
      : dispatch(updateFavorites([smallMenuTarget]));
  };

  const setMenuStates = () => {
    dispatch(setIsSmallMenuOpen(false));
    dispatch(setSmallMenuTarget(null));
  };

  const handleUnMount = () => {
    'worklet';
    backgroundOpacity.value = withTiming(0);

    translateY.value = withTiming('100%', {}, finished => {
      if (finished) {
        runOnJS(setMenuStates)();
      }
    });
  };

  const bgAnimatedStyles = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const contentContainerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    if (!smallMenuTarget) return;
    const isPresent = favorites.some(
      favorite => favorite?.id === smallMenuTarget?.id,
    );
    setIsPresent(isPresent);
  }, [favorites, smallMenuTarget]);

  useEffect(() => {
    backgroundOpacity.value = withTiming(1);
    translateY.value = withTiming('0%');
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      translateY.value = `${clamp(e.translationY, 0, 100)}%`;
    })
    .onEnd(() => {
      if (translateY.value === '0%') return;
      handleUnMount();
    });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleUnMount}>
        <Animated.View
          style={[styles.touchContainer, bgAnimatedStyles]}></Animated.View>
      </TouchableWithoutFeedback>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.contentContainer,
            contentContainerAnimatedStyles,
            {
              backgroundColor: isDarkMode ? '#191724' : '#FFFFFF',
              borderWidth: isDarkMode ? 1 : 0,
              borderColor: isDarkMode && '#2A2838',
            },
          ]}>
          <View
            style={[
              styles.navigation,
              {backgroundColor: isDarkMode ? '#7B57E4' : '#4527A0'},
            ]}></View>
          <Text
            style={[
              styles.smallMenuText,
              {color: isDarkMode ? '#7B57E4' : '#4527A0'},
            ]}>
            Options
          </Text>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={updateFavoriteList}>
            <Text
              style={[
                styles.smallMenuOptionText,
                {color: isDarkMode ? '#FFFFFF' : '#191724'},
              ]}>
              {isPresent ? 'Remove from Favourites' : 'Add to Favourites'}
            </Text>

            {isPresent
              ? Icons.AntDesign.heartFilled(18, '#FF5858')
              : Icons.AntDesign.heart(18, isDarkMode ? 'white' : 'black')}
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SmallMenu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },

  touchContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  contentContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },

  navigation: {
    width: 45,
    height: 8,
    borderRadius: 100,
    margin: 'auto',
  },

  smallMenuText: {
    marginTop: 10,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 87, 228, 0.1)',
  },

  menuOption: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallMenuOptionText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },
});
