import React from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';

import {Icons} from '../../utils/constants.utils';

const BackButton = ({callback, additionalStyles}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity style={{...additionalStyles}} onPress={callback}>
      {Icons.Ionicons.back(24, isDarkMode ? 'white' : 'black')}
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
