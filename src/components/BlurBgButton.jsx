import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icons} from '../utils/constants.utils';

const BlurBgButton = ({song, img, callback, isPlaying, additionalStyles}) => {
  return (
    <View style={[styles.container, {...additionalStyles}]}>
      <ImageBackground
        source={img} // Replace with your image
        style={styles.contentContainer}
        blurRadius={50} // Adjust the blur intensity
      >
        <TouchableOpacity onPress={callback}>
          <View style={styles.playButtonTextContainer}>
            <Text numberOfLines={1} style={styles.playButtonText}>
              {song.title || 'Song name'}
            </Text>
            {!isPlaying
              ? Icons.Ionicons.circlePlay(38, 'white')
              : Icons.Ionicons.circlePause(38, 'white')}
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default BlurBgButton;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    top: '95%',
    left: '50%',
    transform: `translate(-50%, -95%)`,
    borderRadius: 100,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  playButtonText: {
    width: 80,
    overflow: 'hidden',
    color: 'white',
    fontSize: 12,
  },
});
