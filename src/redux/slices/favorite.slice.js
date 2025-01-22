import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    updateFavorites: (state, action) => {
      state.favorites = [...state.favorites, ...action.payload];
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        song => song.id !== action.payload.id,
      );
    },

    removeDeletedFavouriteSongs: (state, action) => {
      const songIdsToRemove = action.payload.map(song => song.id);
      state.favorites = state.favorites.filter(
        e => !songIdsToRemove.includes(e.id),
      );
    },
  },
});

export const {updateFavorites, removeFromFavorites, removeDeletedFavouriteSongs} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
