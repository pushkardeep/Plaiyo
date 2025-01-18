import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';

import MenuButton from '../MenuButton';
import BackButton from './BackButton';

const HeaderContainer = ({isMenu, menuCallback, isBack, additionalStyles}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.container, {...additionalStyles}]}>
      {isMenu && <MenuButton onClick={menuCallback} />}
      {isBack && <BackButton />}

      <Text
        style={[styles.playioText, {color: isDarkMode ? 'white' : 'black'}]}>
        Plaiyo.
      </Text>
    </View>
  );
};

export default HeaderContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  playioText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
