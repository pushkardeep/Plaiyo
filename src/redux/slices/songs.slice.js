import {createSlice} from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
  },
  reducers: {
    setSongs: (state, action) => {
      state.songs = [...state.songs, action.payload];
    },

    removeSongs: (state, action) => {
      const songIdsToRemove = action.payload.map(song => song.id);
      state.songs = state.songs.filter(song => !songIdsToRemove.includes(song.id)); 
    },
  },
});

export const {setSongs, removeSongs} = songsSlice.actions;
export default songsSlice.reducer;
