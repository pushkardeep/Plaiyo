import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

const HeadingContainer = ({title, isViewAll, callback, additionalStyles}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.container, {...additionalStyles}]}>
      <Text
        style={[styles.headingsText, {color: isDarkMode ? 'white' : 'black'}]}>
        {title}
      </Text>

      {isViewAll && (
        <TouchableOpacity onPress={callback}>
          <Text
            style={[
              styles.linkText,
              {color: isDarkMode ? '#7B57E4' : '#4527A0'},
            ]}>
            View All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeadingContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headingsText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 'bold',
  },

  linkText: {
    fontFamily: 'Inter',
    fontSize: 12,
  },
});
