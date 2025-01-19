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
import Widget from '../components/common/Widget';

import {temt_2} from '../utils/constants.utils';

import SoundPlayer from 'react-native-sound-player';
import {setPlaying} from '../redux/slices/playing.slice';

const Feed = ({navigation}) => {
  const data = [1, 2, 3];

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

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  useEffect(() => {
    checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, dispatch);
  }, []);

  useEffect(() => {
    // getSongs(dispatch);
  }, [favorites]);

  useEffect(() => {
    // try {
    //   SoundPlayer.playUrl(`file://${songs[11].songPath}`); // Prefix with "file://"
    // } catch (error) {
    //   console.log('Error playing sound:', error);
    // }
    // MusicControl.setNowPlaying({
    //   title: songs[11].title,
    //   artwork: `file://${songs[11].coverImage}`, // URL or RN's image require()
    //   artist: songs[11].artist,
    //   isLiveStream: true, // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
    // });
  }, [currentSong]);

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
          additionalStyles={{marginBottom: 25}}
        />

        <View>
          {/* playlists cards  */}

          {playlists && playlists.length > 0 ? (
            <FlatList
              data={data}
              renderItem={() => <PlayListCard />}
              // contentContainerStyle={{
              //   paddingBottom: 50,
              // }}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              viewabilityConfig={{itemVisiblePercentThreshold: 50}}
              onViewableItemsChanged={onViewableItemsChanged}
            />
          ) : (
            <PlayListCard additionalStyles={{marginLeft: -25}} />
          )}
        </View>

        {/* Favorites  */}

        <HeadingContainer
          title={'Favorite'}
          isViewAll={true}
          additionalStyles={{marginTop: 25, marginBottom: 10}}
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
              isViewAll={true}
              additionalStyles={{marginTop: 25, marginBottom: 10}}
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
      <Widget />
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
    paddingHorizontal: 25,
    paddingTop: 55,
  },

  favouriteContainer: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  songContainer: {
    flex: 1,
    zIndex: 1,
  },

  dotsContainer: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
});
