import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {menu} from '../utils/constants.utils';

const MenuButton = ({callback, additionalStyles}) => {
  return (
    <TouchableOpacity onPress={callback} style={{...additionalStyles}}>
      <Image
        resizeMode="contain"
        source={menu}
        style={{width: 25, height: 25}}
      />
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({});
