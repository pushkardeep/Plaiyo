import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

// images
import {headphone_dark, headphone_light} from '../utils/constants.utils';

import MiddleColor from '../components/common/MiddleColor';
import TopColor from '../components/common/TopColor';
import BottomColor from '../components/common/BottomColor';

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const middleImage = isDarkMode ? headphone_dark : headphone_light;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.replace('Feed')}>
          <Text style={[styles.skip, {color: isDarkMode ? 'white' : 'black'}]}>
            Skip
          </Text>
        </TouchableOpacity>

        <Image style={styles.image} resizeMode="contain" source={middleImage} />

        <View style={styles.textContainer}>
          <Text
            style={[styles.heading, {color: isDarkMode ? 'white' : 'black'}]}>
            Plaiyo.
          </Text>

          <Text style={[styles.pText, {color: isDarkMode ? 'white' : 'black'}]}>
            Playio supports artists with tools to create, release, and measure
            music across a global stage.
          </Text>
        </View>
      </View>

      <TopColor />
      <MiddleColor />
      <BottomColor />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  contentContainer: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 25,
  },
  skip: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: 'Inter',
    alignSelf: 'flex-end',
  },

  image: {
    width: '100%',
  },

  heading: {
    fontSize: 25,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },

  pText: {
    width: '50%',
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Inter',
  },
});
