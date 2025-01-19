import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import MenuButton from './MenuButton';
import Divider from './Divider';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import TopColor from './common/TopColor';
import BottomColor from './common/BottomColor';

const DrawerContent = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <MenuButton
        callback={() => navigation.closeDrawer()}
        additionalStyles={{marginTop: 30}}
      />

      <View style={styles.menuOptionsContainer}>
        <TouchableOpacity style={styles.menuOption}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <MaterialCommunityIcons
              style={{opacity: 0.6}}
              name="playlist-music"
              size={25}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.menuText,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              Playlist
            </Text>
          </View>
          <MaterialIcons
            style={{opacity: 0.6}}
            name="keyboard-arrow-right"
            size={20}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Divider dividerStyles={{marginVertical: 10}} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorite')}
          style={styles.menuOption}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <MaterialIcons
              style={{opacity: 0.6}}
              name="favorite-outline"
              size={25}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.menuText,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              Favorite
            </Text>
          </View>
          <MaterialIcons
            style={{opacity: 0.6}}
            name="keyboard-arrow-right"
            size={20}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Divider dividerStyles={{marginVertical: 10}} />
        <TouchableOpacity style={styles.menuOption}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <MaterialCommunityIcons
              style={{opacity: 0.6}}
              name="connection"
              size={25}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.menuText,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              Connect
            </Text>
          </View>
          <MaterialIcons
            style={{opacity: 0.6}}
            name="keyboard-arrow-right"
            size={20}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Divider dividerStyles={{marginVertical: 10}} />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePlaylist')}
          style={styles.menuOption}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <MaterialCommunityIcons
              style={{opacity: 0.6}}
              name="playlist-plus"
              size={25}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.menuText,
                {color: isDarkMode ? 'white' : 'black'},
              ]}>
              Create Playlist
            </Text>
          </View>
          <MaterialIcons
            style={{opacity: 0.6}}
            name="keyboard-arrow-right"
            size={20}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Divider dividerStyles={{marginVertical: 10}} />
      </View>

      <TopColor />
      <BottomColor />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    position: 'relative',
  },

  menuOptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
    gap: 2,
  },

  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },

  menuText: {
    fontSize: 17,
    letterSpacing: 0,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});
