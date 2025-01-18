import {StyleSheet, View} from 'react-native';
import React from 'react';

const PaginationDots = ({isActive, additionalStyles}) => {
  return (
    <View
      style={[
        styles.container,
        {...additionalStyles},
        {
          backgroundColor: isActive ? '#7B57E4' : '#4527A0',
          opacity: isActive ? 1 : 0.5,
        },
      ]}></View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({
  container: {
    width: 6.5,
    height: 6.5,
    borderRadius: 100,
  },
});
