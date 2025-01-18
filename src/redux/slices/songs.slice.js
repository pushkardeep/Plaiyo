import {createSlice} from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: null,
  },
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const {setSongs} = songsSlice.actions;
export default songsSlice.reducer;
