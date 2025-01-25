import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import {setCurrentSong, setSongQueue} from '../redux/slices/player.slice';
import {setPause} from '../redux/slices/playing.slice';

import {Icons, temt_2} from '../utils/constants.utils';
import {playSong, stopPlayer} from '../services/player/player.service';
import {setPlaylistReduxStates} from '../utils/redux.utils';

import {checkExists} from '../services/rnfs/rnfs.service';
import {setIsSmallMenuOpen, setSmallMenuTarget} from '../redux/slices/ui.slice';

const SongCard = ({
  song,
  isPlaylist = false,
  playlistId = '',
  queueSongs,
  isDisable = false,
  isSmallMenu,
  isRadioButton,
  selectedSongs,
  setSelectedSongs,
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const [isSelected, setIsSelected] = useState(false);
  const [isImageExists, setIsImageExists] = useState(false);

  const {currentSong} = useSelector(state => state.player);

  const setCurrent = () => {
    // reseting playback states
    stopPlayer(dispatch);
    dispatch(setPause(false));

    // setting states for new song
    dispatch(setCurrentSong(song));
    dispatch(setSongQueue(queueSongs || []));
    setPlaylistReduxStates(isPlaylist, playlistId, dispatch);
    playSong(song.songPath, dispatch, 0);
  };

  const addToList = () => {
    setSelectedSongs(prevSelected => [...prevSelected, song]);
  };

  const removeFromList = () => {
    setSelectedSongs(prevSelected =>
      prevSelected.filter(item => item.id !== song.id),
    );
  };

  const onRadioPress = () => {
    if (isSelected) {
      removeFromList();
    } else {
      addToList();
    }
    setIsSelected(!isSelected); // Toggle the selection state
  };

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

  useEffect(() => {
    if (selectedSongs) {
      setIsSelected(selectedSongs.some(s => s.id === song.id));
    }
  }, [selectedSongs]);

  useEffect(() => {
    if (!song?.coverImage) return setIsImageExists(false);
    checkImageExists(song?.coverImage);
  }, [song]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={setCurrent}
        disabled={isDisable}>
        <Image
          resizeMode="cover"
          source={isImageExists ? {uri: `file://${song.coverImage}`} : temt_2}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}>
            {song.title || 'Song Title'}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.artistText,
              {color: isDarkMode ? '#7B57E4' : '#4527A0'},
            ]}>
            {song.artist || 'Artist Name'}
          </Text>
        </View>

        {currentSong === song &&
          Icons.Feather.speaker(18, isDarkMode ? '#7B57E4' : '#4527A0')}

        {isSmallMenu && (
          <TouchableOpacity
            onPress={() => {
              dispatch(setIsSmallMenuOpen(true));
              dispatch(setSmallMenuTarget(song));
            }}>
            {Icons.Entypo.threeDots(18, isDarkMode ? '#7B57E4' : '#4527A0')}
          </TouchableOpacity>
        )}

        {isRadioButton && (
          <TouchableOpacity
            onPress={onRadioPress}
            style={[
              styles.checkbox,
              {
                borderColor: isDarkMode ? '#7B57E4' : '#4527A0',
                backgroundColor: isDarkMode ? '#2A2838' : '#F5F5F5',
              },
            ]}>
            {isSelected && (
              <View
                style={[
                  styles.checkboxTickContainer,
                  {backgroundColor: isDarkMode ? '#7B57E4' : '#4527A0'},
                ]}>
                {Icons.MaterialIcons.check(12, 'white')}
              </View>
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  image: {
    width: 55,
    aspectRatio: 1,
    borderRadius: 15,
  },

  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },

  title: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 16,
  },

  artistText: {
    fontFamily: 'Inter',
    fontSize: 10,
    opacity: 0.7,
    fontWeight: 'normal',
  },

  checkbox: {
    width: 23,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  checkboxTickContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
