import React from 'react';
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

const SongCard = song => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      style={[
        styles.songItem,
        {
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(217, 217, 217, 0.3)',
        },
      ]}>
      <Image source={temt_2} style={styles.songImage} />

      <View style={styles.songInfo}>
        <Text
          style={[
            styles.songTitle,
            {color: isDarkMode ? '#FFFFFF' : '#000000'},
          ]}>
          Song name
        </Text>
        <View style={styles.artistContainer}>
          <LinearGradient
            colors={
              isDarkMode ? ['#4527A0', '#6200EA'] : ['#6200EA', '#7C4DFF']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.artistBadge}>
            <Text style={styles.artistName}>Artist name</Text>
          </LinearGradient>

          <View
            style={[
              styles.dotSeparator,
              {backgroundColor: isDarkMode ? '#B0B0B0' : '#6200EA'},
            ]}
          />
          <Text
            style={[
              styles.duration,
              {color: isDarkMode ? '#B0B0B0' : '#6200EA'},
            ]}>
            duration
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          borderRadius: 50,
          overflow: 'hidden',
          marginRight: 10,
        }}>
        <LinearGradient
          colors={isDarkMode ? ['#4527A0', '#6200EA'] : ['#6200EA', '#7C4DFF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.playButtonCard}>
          {Icons.FontAwesome5.play(13, 'white')}
        </LinearGradient>
      </TouchableOpacity>

      <View
        style={[
          styles.seekbarTrack,
          {
            backgroundColor: isDarkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(217, 217, 217, 0.3)',
          },
        ]}>
        <View
          style={[
            styles.seekbarTrackProgress,
            {backgroundColor: isDarkMode ? 'white' : '#7C4DFF'},
          ]}></View>
      </View>
    </TouchableOpacity>
  );
};

const PlaylistScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {songs} = useSelector(state => state.songs);
  // data //
  const playlist = {
    name: "Today's Top Hits",
    coverImage: 'https://picsum.photos/400',
    description: 'Your favorite playlist with the best tracks',
    totalSongs: 25,
    duration: '1h 45m',
    songs: [
      {
        title: 'Song Name 1',
        artist: 'Artist Name',
        duration: '3:45',
      },
      {
        title: 'Song Name 2',
        artist: 'Artist Name',
        duration: '4:20',
      },
      // Add more songs as needed
    ],
  };

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
              <BackButton additionalStyles={{alignSelf: 'start'}} />

              <View style={styles.coverImageContainer}>
                <Image source={temt_2} style={styles.coverImage} />
              </View>

              <View style={styles.playlistInfo}>
                <Text
                  style={[
                    styles.playlistName,
                    {color: isDarkMode ? '#FFFFFF' : '#000000'},
                  ]}>
                  Anime vibes
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
                    {playlist.totalSongs} songs • {playlist.duration}
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.iconButton,
                    {
                      backgroundColor: isDarkMode
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(0,0,0,0.05)',
                    },
                  ]}>
                  {Icons.AntDesign.heart(
                    22,
                    isDarkMode ? '#FFFFFF' : '#000000',
                  )}
                </TouchableOpacity>

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
            {songs.map((song, index) => (
              <SongCard key={index} song={song} />
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
    paddingHorizontal: 16,
  },

  songItem: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  songImage: {
    width: 55,
    aspectRatio: 1,
    borderRadius: 10,
    marginLeft: 10,
  },

  songInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 5,
  },

  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  artistBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  artistName: {
    fontSize: 9,
    color: 'white',
  },

  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },

  duration: {
    fontSize: 10,
  },

  playButtonCard: {
    borderRadius: 50,
    padding: 12,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  seekbarTrack: {
    zIndex: 1,
    width: '90%',
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: '5%',
    right: '5%',
    borderRadius: 10,
    overflow: 'hidden',
  },

  seekbarTrackProgress: {
    width: '50%',
    height: '100%',
    borderRadius: 10,
  },
});

export default PlaylistScreen;
