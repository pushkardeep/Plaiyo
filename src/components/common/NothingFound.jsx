import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';

const NothingFound = ({
  title,
  description,
  isDescription = false,
  additionalStyles,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.container, {...additionalStyles}]}>
      <Text
        style={[styles.noSongsText, {color: isDarkMode ? 'white' : 'black'}]}>
        {title}
      </Text>

      {isDescription && (
        <Text
          style={[
            styles.suggestionText,
            {color: isDarkMode ? 'white' : 'black'},
          ]}>
          {description}
        </Text>
      )}
    </View>
  );
};

export default NothingFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },

  noSongsText: {
    fontFamily: 'Inter',
    fontSize: 12,
    opacity: 0.85,
  },

  suggestionText: {
    width: '220',
    fontFamily: 'Inter',
    fontSize: 9,
    opacity: 0.6,
    textAlign: 'center',
  },
});
