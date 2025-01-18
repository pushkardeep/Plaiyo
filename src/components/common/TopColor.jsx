import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TopColor = ({additionalStyles}) => {
  return <View style={[styles.container, {...additionalStyles}]}></View>;
};

export default TopColor;

const styles = StyleSheet.create({
  container: {
    width: 120,
    aspectRatio: 1,
    zIndex: 0,
    position: 'absolute',
    top: '0%',
    left: '100%',
    transform: 'translate(-100%, -0%)',
    filter: 'blur(100px)',
    backgroundColor: '#4527A0',
  },
});
