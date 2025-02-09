import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {StyleSheet, Text, View, Image} from 'react-native';
import BlurBgButton from './BlurBgButton';

import {setCurrentSong, setSongQueue} from '../redux/slices/player.slice';
import {
  pauseSong,
  playSong,
  resumeSong,
} from '../services/player/player.service';
import {setPlaylistReduxStates} from '../utils/redux.utils';
import {checkExists} from '../services/rnfs/rnfs.service';

import {temt_2} from '../utils/constants.utils';
import {setPause} from '../redux/slices/playing.slice';

const FavouriteCard = ({song}) => {
  const dispatch = useDispatch();

  const [imageSource, setImageSource] = useState(null);
  const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);

  const {isPlaying} = useSelector(state => state.playing);
  const {currentSong} = useSelector(state => state.player);
  const {isPaused} = useSelector(state => state.playing);
    const {favorites} = useSelector(state => state.favorites);

  const setCurrent = () => {
    if (isCurrentPlaying && isPlaying) {
      if (isPaused) {
        resumeSong(dispatch);
      } else {
        pauseSong(dispatch);
      }
    } else {
      setPlaylistReduxStates(false, '', dispatch);
      dispatch(setPause(false));
      dispatch(setSongQueue(favorites));
      dispatch(setCurrentSong(song));
      playSong(song?.songPath, dispatch);
    }
  };

  const checkImageExists = async path => {
    const {success, exists} = await checkExists(path);
    if (success) {
      if (exists) {
        setImageSource({
          uri: `file://${song.coverImage}`,
        });
      } else {
        setImageSource(temt_2);
      }
    } else {
      setImageSource(temt_2);
    }
  };

  useEffect(() => {
    if (!song?.coverImage) return setImageSource(temt_2);
    checkImageExists(song?.coverImage);
  }, [song]);

  useEffect(() => {
    if (currentSong && song) {
      setIsCurrentPlaying(currentSong.id === song.id ? true : false);
    } else {
      setIsCurrentPlaying(false);
    }
  }, [currentSong, song, isPlaying]);

  return (
    <View style={styles.container}>
      <Image resizeMode="cover" source={imageSource} style={[styles.image]} />
      <Image
        style={[styles.imgShadow]}
        resizeMode="cover"
        source={imageSource}
      />
      {song && (
        <BlurBgButton
          song={song}
          img={imageSource}
          callback={setCurrent}
          isPlaying={
            isPlaying && isCurrentPlaying ? (isPaused ? false : true) : false
          }
        />
      )}

      {!song && (
        <Text style={styles.addFavoritesText}>Don't have Favourite</Text>
      )}
    </View>
  );
};

export default FavouriteCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '47%',
    aspectRatio: 1,
    borderRadius: 15,
  },

  image: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  imgShadow: {
    zIndex: 0,
    width: '85%',
    height: '85%',
    filter: 'blur(15px)',
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -80%)',
  },

  addFavoritesText: {
    width: 60,
    textAlign: 'center',
    zIndex: 1,
    position: 'absolute',
    top: '90%',
    left: '50%',
    fontWeight: 'bold',
    transform: 'translate(-50%, -90%)',
    fontSize: 10,
    color: 'white',
    opacity: 0.7,
  },
});
