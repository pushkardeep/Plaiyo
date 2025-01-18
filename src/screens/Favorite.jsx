import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View, useColorScheme, FlatList} from 'react-native';

import TopColor from '../components/common/TopColor';
import MiddleColor from '../components/common/MiddleColor';
import BottomColor from '../components/common/BottomColor';

import SongCard from '../components/SongCard';
import HeaderContainer from '../components/common/HeaderContainer';
import NothingFound from '../components/common/NothingFound';
import Widget from '../components/common/Widget';

const Favorite = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {songs} = useSelector(state => state.songs);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
        <HeaderContainer isBack={true} isMenu={false} />
        {songs && songs.length > 0 ? (
          <>
            <Text
              style={[
                styles.headingsText,
                {
                  color: isDarkMode ? 'white' : 'black',
                  marginTop: 25,
                  marginBottom: 10,
                },
              ]}>
              Favorite
            </Text>
            <View style={styles.favoriteContainer}>
              <FlatList
                data={songs}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <SongCard song={item} />}
                contentContainerStyle={{gap: 10, paddingBottom: 10}}
              />
            </View>
          </>
        ) : (
          <NothingFound
            title={'Not any favorite found'}
            isDescription={false}
          />
        )}
      </View>

      {/* <Widget /> */}

      <TopColor />
      <MiddleColor />
      <BottomColor />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 25,
    paddingTop: 55,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  playioText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  headingsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  favoriteContainer: {
    flex: 1,
  },
});
