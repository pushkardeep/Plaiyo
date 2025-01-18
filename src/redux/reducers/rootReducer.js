import {combineReducers} from '@reduxjs/toolkit';

// slices
import songsSlice from '../slices/songs.slice';
import permissionSlice from '../slices/permissionSlice';
import playlistsSlice from '../slices/playlist.slice';
import favoritesSlice from '../slices/favorite.slice';
import playerSlice from '../slices/player.slice';
import playingSlice from '../slices/playing.slice';

// rootReducer
const rootReducer = combineReducers({
  songs: songsSlice,
  permission: permissionSlice,
  playlist: playlistsSlice,
  favorites: favoritesSlice,
  player: playerSlice,
  playing: playingSlice,
});

export default rootReducer;
