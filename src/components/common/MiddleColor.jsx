import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MiddleColor = ({additionalStyles}) => {
  return <View style={[styles.container, {...additionalStyles}]}></View>;
};

export default MiddleColor;

const styles = StyleSheet.create({
  container: {
    width: 120,
    aspectRatio: 1,
    zIndex: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(100px)',
    backgroundColor: '#4527A0',
  },
});
