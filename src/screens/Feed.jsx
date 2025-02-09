import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, useColorScheme} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import SongCard from '../components/SongCard';
import PlayListCard from '../components/PlayListCard';
import FavouriteCard from '../components/FavouriteCard';

import {PERMISSIONS} from 'react-native-permissions';
import {checkPermission} from '../utils/permissions.utils';
import {initializeSongs} from '../services/songs/songs.service';

import TopColor from '../components/common/TopColor';
import MiddleColor from '../components/common/MiddleColor';
import BottomColor from '../components/common/BottomColor';

import HeaderContainer from '../components/common/HeaderContainer';
import HeadingContainer from '../components/common/HeadingContainer';
import AccessAllower from '../components/AccessAllower';
import NothingFound from '../components/common/NothingFound';
import PaginationDots from '../components/PaginationDots';
import Widget from '../components/common/Widget';
import Player from '../components/Player';
import SmallMenu from '../components/SmallMenu';

const Feed = ({navigation}) => {
  const dispatch = useDispatch();

  const isDarkMode = useColorScheme() === 'dark';

  const [activeIndex, setActiveIndex] = useState(0);
  const {songs} = useSelector(state => state.songs);
  const {isSmallMenuOpen, smallMenuTarget} = useSelector(state => state.ui);
  const {audioReadPermission} = useSelector(state => state.permission);
  const {currentSong} = useSelector(state => state.player);
  const {playlists} = useSelector(state => state.playlist);
  const {favorites} = useSelector(state => state.favorites);

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const handleDrawer = navigation => {
    navigation.openDrawer();
  };

  const onPlaylistClick = index => {
    navigation.navigate('Playlist', {playlistIndex: index});
  };

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  useEffect(() => {
    checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, dispatch);
  }, []);

  useEffect(() => {
    if (!audioReadPermission) return;
    initializeSongs(songs, dispatch);
  }, [audioReadPermission]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
        {/* songs  */}

        {songs && songs.length > 0 ? (
          <>
            {/* playlist cards  */}

            <HeaderContainer
              isMenu={true}
              menuCallback={() => handleDrawer(navigation)}
              additionalStyles={{marginBottom: 25, paddingHorizontal: 25}}
            />

            <View>
              {playlists && playlists.length > 0 ? (
                <FlatList
                  data={playlists}
                  renderItem={playlist => (
                    <PlayListCard
                      callback={() => onPlaylistClick(playlist.index)}
                      playlist={playlist.item}
                    />
                  )}
                  contentContainerStyle={{
                    paddingBottom: 50,
                  }}
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  viewabilityConfig={{itemVisiblePercentThreshold: 50}}
                  onViewableItemsChanged={onViewableItemsChanged}
                />
              ) : (
                <PlayListCard
                  callback={() => navigation.navigate('CreatePlaylist')}
                />
              )}

              {playlists && playlists.length > 0 && (
                <View style={styles.dotsContainer}>
                  {playlists.map((_, i) => (
                    <PaginationDots key={i} isActive={i == activeIndex} />
                  ))}
                </View>
              )}
            </View>

            {/* Favorites  */}

            <HeadingContainer
              title={'Favorite'}
              isViewAll={favorites?.length > 2}
              callback={() => navigation.navigate('Favorite')}
              additionalStyles={{
                marginTop: 25,
                marginBottom: 10,
                paddingHorizontal: 25,
              }}
            />

            <View style={styles.favouriteContainer}>
              <FavouriteCard song={favorites[0]} />
              <FavouriteCard song={favorites[1]} />
            </View>

            {/* All songs  */}

            <HeadingContainer
              title={'All Songs'}
              additionalStyles={{
                marginTop: 25,
                marginBottom: 10,
                paddingHorizontal: 25,
              }}
            />

            <View style={styles.songContainer}>
              <FlatList
                data={songs}
                renderItem={({item}) => (
                  <SongCard song={item} queueSongs={songs} isSmallMenu={true} />
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: 10, paddingBottom: 10}}
              />
            </View>
          </>
        ) : audioReadPermission ? (
          <NothingFound
            title={'No songs found'}
            description={
              'Please put your songs in the Music folder in your storage'
            }
            isDescription={true}
          />
        ) : (
          <AccessAllower />
        )}
      </View>
      {currentSong && <Widget callback={() => setIsPlayerOpen(true)} />}
      {isSmallMenuOpen && smallMenuTarget && <SmallMenu />}
      {isPlayerOpen && <Player setOpenState={setIsPlayerOpen} />}
      <TopColor
        additionalStyles={{left: '0%', transform: 'translate(-0%, -0%)'}}
      />
      <MiddleColor />
      <BottomColor
        additionalStyles={{left: '100%', transform: 'translate(-100%, -0%)'}}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'space-between',
    paddingTop: 55,
  },

  favouriteContainer: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  songContainer: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 25,
  },

  dotsContainer: {
    marginTop: -30,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
});
