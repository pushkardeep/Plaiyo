import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BottomColor = ({additionalStyles}) => {
  return <View style={[styles.container, {...additionalStyles}]}></View>;
};

export default BottomColor;

const styles = StyleSheet.create({
  container: {
    width: 120,
    aspectRatio: 1,
    zIndex: 0,
    position: 'absolute',
    top: '100%',
    left: '0%',
    transform: 'translate(-0%, -100%)',
    filter: 'blur(100px)',
    backgroundColor: '#4527A0',
  },
});
