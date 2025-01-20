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
  },
});

export const {setSongs} = songsSlice.actions;
export default songsSlice.reducer;
