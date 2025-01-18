import React from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import {requestPermission} from '../utils/permissions.utils';
import {PERMISSIONS} from 'react-native-permissions';

const AccessAllower = () => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          requestPermission(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, dispatch)
        }
        style={[
          styles.permissionButton,
          {borderColor: isDarkMode ? '#7B57E4' : 'black'},
        ]}>
        <Text
          style={[
            styles.permissionButtonText,
            {color: isDarkMode ? '#7B57E4' : 'black'},
          ]}>
          Allow access
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.accessAllowText,
          {color: isDarkMode ? 'white' : 'black'},
        ]}>
        Please allow access to your music files
      </Text>
    </View>
  );
};

export default AccessAllower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  accessAllowText: {
    width: '150',
    fontFamily: 'Inter',
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'center',
  },

  permissionButton: {
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  permissionButtonText: {
    fontFamily: 'Inter',
    fontSize: 10,
  },
});
