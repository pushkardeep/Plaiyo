import {createSlice} from '@reduxjs/toolkit';

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: [],
  },
  reducers: {
    createPlaylists: (state, action) => {
      state.playlists = [...state.playlists, action.payload];
    },
  },
});

export const {createPlaylists} = playlistsSlice.actions;
export default playlistsSlice.reducer;
