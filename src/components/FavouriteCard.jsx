import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, Image} from 'react-native';

import BlurBgButton from './BlurBgButton';
import {setCurrentSong} from '../redux/slices/player.slice';
import {temt_2} from '../utils/constants.utils';
import {pauseSong, playSong} from '../services/player/player.service';

const FavouriteCard = ({song}) => {
  const dispatch = useDispatch();
  const [imageSource, setImageSource] = useState(null);
  const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
  const {isPlaying} = useSelector(state => state.playing);
  const {currentSong} = useSelector(state => state.player);

  const setCurrent = () => {
    dispatch(setCurrentSong(song));
    if (!isPlaying) {
      playSong(song.songPath, dispatch, 0);
    } else {
      pauseSong(dispatch);
    }
  };

  useEffect(() => {
    if (song) {
      setImageSource({
        uri: `file://${song.coverImage}`,
      });
    } else {
      setImageSource(temt_2);
    }
  }, [song]);

  useEffect(() => {
    if (currentSong && isPlaying && song) {
      setIsCurrentPlaying(currentSong.id === song.id ? true : false);
    } else {
      setIsCurrentPlaying(false);
    }
  }, [currentSong, isPlaying, song]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={imageSource}
        style={[styles.image, {opacity: song ? 1 : 0.4}]}
      />
      <Image
        style={[styles.imgShadow, {display: song ? '' : 'none'}]}
        resizeMode="cover"
        source={imageSource}
      />
      {song && (
        <BlurBgButton
          song={song}
          img={imageSource}
          callback={setCurrent}
          isPlaying={isCurrentPlaying}
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 10,
    color: 'white',
    opacity: 0.7,
  },
});
