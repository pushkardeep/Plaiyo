import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#1D1B29' : 'white'},
      ]}>
      <ActivityIndicator
        size="large"
        color={isDarkMode ? '#7B57E4' : '#4527A0'}
      />
      <Text
        style={[
          styles.loadingText,
          {color: isDarkMode ? '#FFFFFF' : '#191724'},
        ]}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  loadingText: {
    fontFamily: 'Inter',
    fontSize: 15,
    marginLeft: 7,
  },
});
