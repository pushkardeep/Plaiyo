import React from 'react';
import {StyleSheet, StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

// screens
import Home from './src/screens/Home';
import Feed from './src/screens/Feed';
import Player from './src/screens/Player';
import Favorite from './src/screens/Favorite';
import CreatePlaylist from './src/screens/CreatePlaylist';
import LoadingScreen from './src/components/LoadingScreen';
import Playlist from './src/screens/Playlist';

// component
import BgSongNotifee from './src/components/BgSongNotifee';
import SongUpdater from './src/components/SongUpdater';
import DrawerContent from './src/components/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function FeedWithDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Optional: Show header for drawer
      }}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Playlist" component={Playlist} />
      <Drawer.Screen name="Favorite" component={Favorite} />
      <Drawer.Screen name="CreatePlaylist" component={CreatePlaylist} />
    </Drawer.Navigator>
  );
}

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // drawerType: "slide",
        }}>
        <Stack.Screen name="FeedWithDrawer" component={FeedWithDrawer} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="Playlist" component={Playlist} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="CreatePlaylist" component={CreatePlaylist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GestureHandlerRootView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <SongUpdater />
          <BgSongNotifee />
          <MyStack />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
