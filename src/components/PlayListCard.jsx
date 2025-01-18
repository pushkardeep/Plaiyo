import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {temt_1} from '../utils/constants.utils';

const PlayListCard = ({playlist, isAvailable, additionalStyles}) => {
  const {width} = Dimensions.get('window');

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: width,
          alignItems: 'center',
          ...additionalStyles,
        },
      ]}>
      <View style={{width: '90%', height: '100%'}}>
        <Image
          resizeMode="cover"
          source={temt_1}
          style={[
            styles.playlistImg,
            {zIndex: 1, opacity: isAvailable ? 1 : 0.4},
          ]}
        />
        <Image
          resizeMode="cover"
          source={temt_1}
          style={[
            styles.playlistImgShadow,
            {display: isAvailable ? '' : 'none'},
          ]}
        />
        {isAvailable && (
          <View style={styles.playlistInfoContainer}>
            <Text style={styles.playlistTitle}>{playlist?.title}</Text>
            <Text style={styles.playlistSongsCount}>
              {playlist?.songs?.length} Songs
            </Text>
          </View>
        )}

        {!isAvailable && (
          <View style={styles.playlistCreateTextContainer}>
            <Text style={styles.playlistIndicatorText}>
              Don't have any playlist
            </Text>
            <Text style={styles.playlistCreateText}>
              Click to create playlist
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PlayListCard;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 2.3,
    position: 'relative',
  },

  playlistInfoContainer: {
    zIndex: 1,
    position: 'absolute',
    top: '90%',
    left: '10%',
    transform: 'translate(-10%, -90%)',
  },

  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  playlistSongsCount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.7,
  },

  playlistImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  playlistImgShadow: {
    width: '85%',
    height: '85%',
    zIndex: 0,
    filter: 'blur(15px)',
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -80%)',
  },

  playlistCreateTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  playlistIndicatorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  playlistCreateText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.7,
  },
});
