import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

import TopColor from '../components/common/TopColor';
import MiddleColor from '../components/common/MiddleColor';
import BottomColor from '../components/common/BottomColor';

import {Icons, temt_2} from '../utils/constants.utils';

const Player = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.backIcon}>
          {Icons.EvilIcons.down(35, isDarkMode ? 'white' : '#7150D0')}
        </TouchableOpacity>

        <View style={styles.imgContainer}>
          <Image style={styles.image} resizeMode="cover" source={temt_2} />
          <Image
            style={styles.imageShadow}
            resizeMode="cover"
            source={temt_2}
          />
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text
              style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}>
              Son name
            </Text>
            <Text
              style={[styles.artist, {color: isDarkMode ? 'white' : 'black'}]}>
              Artist name
            </Text>
          </View>

          {/* heart  */}
          <TouchableOpacity>
            {Icons.AntDesign.heart(24, isDarkMode ? 'white' : 'black')}
          </TouchableOpacity>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor={isDarkMode ? 'white' : '#AE92FF'}
          minimumTrackTintColor="#7B57E4"
          maximumTrackTintColor="#C4C4C4"
        />

        <Text style={[styles.time, {color: isDarkMode ? 'white' : '#7150D0'}]}>
          01:21
        </Text>

        {/* controlls  */}
        <View style={styles.controlsContainer}>
          {/* shuffle  */}
          <TouchableOpacity>
            {Icons.Ionicons.shuffle(29, '#BAA8ED')}
          </TouchableOpacity>

          {/* stepBackward  */}
          <TouchableOpacity>
            {Icons.AntDesign.stepbackward(30, '#BAA8ED')}
          </TouchableOpacity>

          {/* pause , play  */}
          <TouchableOpacity style={{position: 'relative'}}>
            <LinearGradient
              colors={['#7150D0', '#AE92FF']}
              style={styles.linearGradient}>
              {Icons.Ionicons.pause(30, 'white')}
            </LinearGradient>

            {/* shadow  */}
            <LinearGradient
              colors={['#7150D0', '#AE92FF']}
              style={styles.linearGradientShadow}></LinearGradient>
          </TouchableOpacity>

          {/* stepforward  */}
          <TouchableOpacity>
            {Icons.AntDesign.stepforward(30, '#BAA8ED')}
          </TouchableOpacity>

          {/* repeat  */}
          <TouchableOpacity>
            {Icons.Feather.repeat(25, '#BAA8ED')}
          </TouchableOpacity>
        </View>
      </View>

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

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: 'relative',
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 25,
    paddingVertical: 55,
  },

  backIcon: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  imgContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: 15,
  },

  imageShadow: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
    zIndex: 0,
    filter: 'blur(15px)',
    position: 'absolute',
    top: '120%',
    left: '50%',
    transform: 'translate(-50%, -120%)',
  },

  infoContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  artist: {
    fontSize: 12,
    opacity: 0.6,
  },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },

  linearGradient: {
    borderRadius: 50,
    padding: 18,
    zIndex: 1,
  },

  linearGradientShadow: {
    zIndex: 0,
    borderRadius: 50,
    padding: 30,
    filter: 'blur(15px)',
    position: 'absolute',
    top: '150%',
    left: '80%',
    transform: 'translate(-80%, -150%)',
  },

  slider: {
    marginTop: 60,
  },

  time: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: -5,
    alignSelf: 'flex-end',
  },
});
