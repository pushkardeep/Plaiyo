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

import {Icons} from '../utils/constants.utils';

import {
  updateFavorites,
  removeFromFavorites,
} from '../redux/slices/favorite.slice';
import {setCurrentSong} from '../redux/slices/player.slice';
import {playSong} from '../services/player/player.service';

// Menu button
const SmallMenuButton = ({callback, isDarkMode}) => {
  return (
    <TouchableOpacity onPress={callback}>
      {Icons.Entypo.threeDots(18, isDarkMode ? '#7B57E4' : '#4527A0')}
    </TouchableOpacity>
  );
};

// Menu
const SmallMenu = ({isPresent, callback, isDarkMode}) => {
  return (
    <View
      style={[
        styles.smallMenu,
        {
          backgroundColor: isDarkMode ? '#191724' : '#FFFFFF',
          borderWidth: 1,
          borderColor: isDarkMode ? '#2A2838' : '#E5E5E5',
        },
      ]}>
      <Text
        style={[
          styles.smallMenuText,
          {color: isDarkMode ? '#7B57E4' : '#4527A0'},
        ]}>
        Options
      </Text>
      <TouchableOpacity onPress={callback} style={styles.menuOption}>
        <Text
          style={[
            styles.smallMenuOptionText,
            {color: isDarkMode ? '#FFFFFF' : '#191724'},
          ]}>
          {isPresent ? 'Remove' : 'Favourites'}
        </Text>

        {isPresent
          ? Icons.AntDesign.heartFilled(18, '#FF5858')
          : Icons.AntDesign.heart(18, isDarkMode ? 'white' : 'black')}
      </TouchableOpacity>
    </View>
  );
};

const SongCard = ({
  song,
  isDisable = false,
  isSmallMenu,
  isRadioButton,
  selectedSongs,
  setSelectedSongs,
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isPresent, setIsPresent] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const {favorites} = useSelector(state => state.favorites);

  const setCurrent = () => {
    dispatch(setCurrentSong(song));
    playSong(song.songPath, dispatch, 0);
  };

  const toggleMenu = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const addToList = () => {
    setSelectedSongs(prevSelected => [...prevSelected, song]);
  };

  const removeFromList = () => {
    setSelectedSongs(prevSelected =>
      prevSelected.filter(item => item.id !== song.id),
    );
  };

  const updateFavoriteList = () => {
    isPresent
      ? dispatch(removeFromFavorites(song))
      : dispatch(updateFavorites([song]));
  };

  const onRadioPress = () => {
    if (isSelected) {
      removeFromList();
    } else {
      addToList();
    }
    setIsSelected(!isSelected); // Toggle the selection state
  };

  useEffect(() => {
    const isPresent = favorites.some(favorite => favorite.id === song.id);
    setIsPresent(isPresent);
  }, [favorites]);

  useEffect(() => {
    if (selectedSongs) {
      setIsSelected(selectedSongs.some(s => s.id === song.id));
    }
  }, [selectedSongs]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={setCurrent}
        disabled={isDisable}>
        <Image
          resizeMode="cover"
          source={{uri: `file://${song.coverImage}`}}
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

        {isSmallMenu && (
          <SmallMenuButton callback={toggleMenu} isDarkMode={isDarkMode} />
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

      {isOptionOpen && (
        <SmallMenu
          isPresent={isPresent}
          callback={updateFavoriteList}
          isDarkMode={isDarkMode}
        />
      )}
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

  smallMenu: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    minWidth: 180,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },

  smallMenuText: {
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
