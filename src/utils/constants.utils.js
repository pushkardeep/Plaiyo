// constants.js

// Image assets
export const headphone_dark = require('../assets/images/headphone-dark.png');
export const headphone_light = require('../assets/images/headphone-light.png');
export const temt_1 = require('../assets/images/temp_1.png');
export const temt_2 = require('../assets/images/temp_2.jpg');
export const menu = require('../assets/images/menu.png');

// React Native Vector Icons constants
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

export const Icons = {
  Ionicons: {
    back: (size, color) => (
      <Ionicons name="chevron-back-outline" size={size} color={color} />
    ),

    circlePlay: (size, color) => (
      <Ionicons name="play-circle" size={size} color={color} />
    ),

    circlePause: (size, color) => (
      <Ionicons name="pause-circle" size={size} color={color} />
    ),

    pause: (size, color) => <Ionicons name="pause" size={size} color={color} />,

    shuffle: (size, color) => (
      <Ionicons name="shuffle" size={size} color={color} />
    ),
  },

  Entypo: {
    threeDots: (size, color) => (
      <Entypo name="dots-three-vertical" size={size} color={color} />
    ),
  },

  AntDesign: {
    heart: (size, color) => (
      <AntDesign name="hearto" size={size} color={color} />
    ),

    heartFilled: (size, color) => (
      <AntDesign name="heart" size={size} color={color} />
    ),

    stepforward: (size, color) => (
      <AntDesign name="stepforward" size={size} color={color} />
    ),

    stepbackward: (size, color) => (
      <AntDesign name="stepbackward" size={size} color={color} />
    ),
  },

  EvilIcons: {
    down: (size, color) => (
      <EvilIcons name="chevron-down" size={size} color={color} />
    ),
  },

  Feather: {
    repeat: (size, color) => (
      <Feather name="repeat" size={size} color={color} />
    ),
  },

  MaterialIcons: {
    check: (size, color) => (
      <MaterialIcons name="check" size={size} color={color} />
    ),
    imgAdd: (size, color) => (
      <MaterialIcons name="add-photo-alternate" size={size} color={color} />
    ),
  },

  MaterialCommunityIcons: {
    musicNote: (size, color) => (
      <MaterialCommunityIcons name="music-note" size={size} color={color} />
    ),
    repeat: (size, color) => (
      <MaterialCommunityIcons name="repeat" size={size} color={color} />
    ),
    repeatOnce: (size, color) => (
      <MaterialCommunityIcons name="repeat-once" size={size} color={color} />
    ),

    pause: (size, color) => (
      <MaterialCommunityIcons name="pause" size={size} color={color} />
    ),
  },

  FontAwesome5: {
    play: (size, color) => (
      <FontAwesome5 name="play" size={size} color={color} />
    ),
  },
};
