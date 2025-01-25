import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import Player from '../components/Player';
import SongCard from '../components/SongCard';
import Widget from '../components/common/Widget';
import BackButton from '../components/common/BackButton';
import BottomColor from '../components/common/BottomColor';

import {setCurrentSong, setSongQueue} from '../redux/slices/player.slice';
import {
  pauseSong,
  playSong,
  resumeSong,
} from '../services/player/player.service';

import {handleShuffle} from '../utils/player.utils';
import {Icons, temt_2} from '../utils/constants.utils';
import {setPlaylistReduxStates} from '../utils/redux.utils';
import {checkExists} from '../services/rnfs/rnfs.service';

import LinearGradient from 'react-native-linear-gradient';

const PlaylistScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const {playlists} = useSelector(state => state.playlist);
  const {currentSong, isShuffle, isRepeat, playlistId} = useSelector(
    state => state.player,
  );
  const {isPlaying, isPaused} = useSelector(state => state.playing);
  const {isSmallMenuOpen, smallMenuTarget} = useSelector(state => state.ui);

  const [playlist, setPlaylist] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isImageExists, setIsImageExists] = useState(false);
  const [isCurrentPlaylistPlaying, setIsCurrentPlaylistPlaying] =
    useState(false);

  const {playlistIndex} = route.params;

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

  const handlePlayback = () => {
    if (isPlaying && isCurrentPlaylistPlaying) {
      if (isPaused) {
        resumeSong(dispatch);
      } else {
        pauseSong(dispatch);
      }
    } else {
      playAll();
    }
  };

  const playAll = () => {
    if (!playlist || !playlist.songs?.length) return;

    dispatch(setSongQueue(playlist?.songs));
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist?.songs?.length);
      setPlaylistReduxStates(true, playlist?.id, dispatch);
      dispatch(setCurrentSong(playlist?.songs[randomIndex]));
      playSong(playlist?.songs[randomIndex]?.songPath, dispatch);
    } else {
      setPlaylistReduxStates(true, playlist?.id, dispatch);
      dispatch(setCurrentSong(playlist?.songs[0]));
      playSong(playlist?.songs[0]?.songPath, dispatch);
    }
  };

  useEffect(() => {
    if (!playlist?.cover) return setIsImageExists(false);
    checkImageExists(playlist?.cover);
  }, [playlist]);

  useEffect(() => {
    setPlaylist(playlists[playlistIndex]);
  }, [playlistIndex]);

  useEffect(() => {
    setIsCurrentPlaylistPlaying(playlist?.id === playlistId);
  }, [playlistId, playlist]);

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
                    isImageExists ? {uri: `file://${playlist.cover}`} : temt_2
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
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayback}>
                  <LinearGradient
                    colors={['#4527A0', '#6200EA']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.playButtonGradient}>
                    {isPlaying && isCurrentPlaylistPlaying
                      ? isPaused
                        ? Icons.FontAwesome5.play(13, 'white')
                        : Icons.Ionicons.pause(20, 'white')
                      : Icons.FontAwesome5.play(13, 'white')}
                    <Text style={styles.playButtonText}>Play All</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleShuffle(isRepeat, isShuffle, dispatch)}
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
                    isShuffle
                      ? isDarkMode
                        ? '#7B57E4'
                        : '#4527A0'
                      : isDarkMode
                      ? '#FFFFFF'
                      : '#000000',
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.songsList}>
            {playlist &&
              playlist.songs.map((song, index) => (
                <SongCard
                  key={index}
                  song={song}
                  isPlaylist={true}
                  playlistId={playlist?.id}
                  queueSongs={playlist?.songs}
                  isSmallMenu={true}
                />
              ))}
          </View>
        </View>
      </ScrollView>

      {currentSong && <Widget callback={() => setIsPlayerOpen(true)} />}
      {isSmallMenuOpen && smallMenuTarget && <SmallMenu />}
      {isPlayerOpen && <Player setOpenState={setIsPlayerOpen} />}

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
