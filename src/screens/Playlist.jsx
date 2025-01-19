import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Icons, temt_2} from '../utils/constants.utils';
import BackButton from '../components/common/BackButton';

import BottomColor from '../components/common/BottomColor';
import Widget from '../components/common/Widget';
import SongCard from '../components/SongCard';

const PlaylistScreen = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {playlists} = useSelector(state => state.playlist);
  const [playlist, setPlaylist] = useState(null);

  const {playlistIndex} = route.params;

  useEffect(() => {
    setPlaylist(playlists[playlistIndex]);
  }, [playlistIndex]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : '#FFFFFF'},
      ]}>
      <ScrollView style={styles.contentContainer}>
        <View style={{flex: 1, zIndex: 1}}>
          <LinearGradient
            colors={
              isDarkMode
                ? ['#4527A0', '#1D1B29', '#1D1B29']
                : ['#6200EA', '#FFFFFF', '#FFFFFF']
            }>
            <View style={styles.playListInfoContainer}>
              <BackButton
                callback={() => navigation.goBack()}
                additionalStyles={{alignSelf: 'start'}}
              />

              <View style={styles.coverImageContainer}>
                <Image
                  source={
                    playlist?.cover ? {uri: `file://${playlist.cover}`} : temt_2
                  }
                  style={styles.coverImage}
                />
              </View>

              <View style={styles.playlistInfo}>
                <Text
                  style={[
                    styles.playlistName,
                    {color: isDarkMode ? '#FFFFFF' : '#000000'},
                  ]}>
                  {playlist && playlist?.name}
                </Text>
                <View style={styles.statsContainer}>
                  {Icons.MaterialCommunityIcons.musicNote(
                    16,
                    isDarkMode ? '#E0E0E0' : '#424242',
                  )}
                  <Text
                    style={[
                      styles.statsText,
                      {color: isDarkMode ? '#E0E0E0' : '#424242'},
                    ]}>
                    {playlist && playlist?.songs?.length} songs
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.playButton}>
                  <LinearGradient
                    colors={['#4527A0', '#6200EA']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.playButtonGradient}>
                    {Icons.FontAwesome5.play(13, 'white')}
                    <Text style={styles.playButtonText}>Play All</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.iconButton,
                    {
                      backgroundColor: isDarkMode
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(0,0,0,0.05)',
                    },
                  ]}>
                  {Icons.Ionicons.shuffle(
                    22,
                    isDarkMode ? '#FFFFFF' : '#000000',
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.songsList}>
            {playlist &&
              playlist.songs.map((song, index) => (
                <SongCard key={index} song={song} isSmallMenu={true} />
              ))}
          </View>
        </View>
      </ScrollView>
      <Widget />
      <BottomColor
        additionalStyles={{left: '100%', transform: 'translate(-100%, -0%)'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  contentContainer: {
    zIndex: 1,
  },

  playListInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 55,
  },

  coverImageContainer: {
    position: 'relative',
    width: 300,
    aspectRatio: 1,
    marginTop: 25,
    marginBottom: 25,
  },

  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    elevation: 10,
  },

  playlistInfo: {
    alignItems: 'center',
    width: '100%',
  },

  playlistName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },

  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statsText: {
    fontSize: 14,
  },

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    width: '100%',
  },

  iconButton: {
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 8,
  },

  playButton: {
    borderRadius: 30,
    marginHorizontal: 16,
    elevation: 5,
  },

  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },

  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  songsList: {
    paddingTop: 25,
    paddingHorizontal: 25,
    gap: 10,
    paddingBottom: 10,
  },
});

export default PlaylistScreen;
