import {StyleSheet, View, useColorScheme} from 'react-native';
import React from 'react';

const Divider = ({dividerStyles}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.divider,
        {...dividerStyles},
        {
          backgroundColor: isDarkMode
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)',
        },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
