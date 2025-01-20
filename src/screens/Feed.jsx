import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, useColorScheme} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

// components
import SongCard from '../components/SongCard';
import PlayListCard from '../components/PlayListCard';
import FavouriteCard from '../components/FavouriteCard';

// methods
import {PERMISSIONS} from 'react-native-permissions';
import {checkPermission} from '../utils/permissions.utils';
import {getSongs} from '../services/songs/songs.service';

import TopColor from '../components/common/TopColor';
import MiddleColor from '../components/common/MiddleColor';
import BottomColor from '../components/common/BottomColor';

import HeaderContainer from '../components/common/HeaderContainer';
import HeadingContainer from '../components/common/HeadingContainer';
import AccessAllower from '../components/AccessAllower';
import NothingFound from '../components/common/NothingFound';
import PaginationDots from '../components/PaginationDots';
import Widget from '../components/common/Widget';

import {temt_2} from '../utils/constants.utils';

import SoundPlayer from 'react-native-sound-player';
import {setPlaying} from '../redux/slices/playing.slice';

const Feed = ({navigation}) => {
  const dispatch = useDispatch();

  const isDarkMode = useColorScheme() === 'dark';

  const [activeIndex, setActiveIndex] = useState(0);
  const {songs} = useSelector(state => state.songs);
  const {audioReadPermission} = useSelector(state => state.permission);
  const {isPlaying} = useSelector(state => state.playing);
  const {currentSong} = useSelector(state => state.player);
  const {playlists} = useSelector(state => state.playlist);
  const {favorites} = useSelector(state => state.favorites);

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
    // getSongs(dispatch)
  }, [audioReadPermission]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
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
          isViewAll={true}
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

        {/* songs  */}

        {songs && songs.length > 0 ? (
          <>
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
                  <SongCard song={item} isSmallMenu={true} />
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
      {currentSong && <Widget />}
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
