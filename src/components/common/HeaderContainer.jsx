import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';

import MenuButton from '../MenuButton';
import BackButton from './BackButton';

const HeaderContainer = ({isMenu, menuCallback, isBack, backCallback, additionalStyles}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.container, {...additionalStyles}]}>
      {isMenu && <MenuButton callback={menuCallback} />}
      {isBack && <BackButton callback={backCallback} />}

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
