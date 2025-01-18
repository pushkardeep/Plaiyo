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
  },
});

export const {updateFavorites, removeFromFavorites} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
