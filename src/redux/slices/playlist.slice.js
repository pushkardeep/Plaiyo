import {createSlice} from '@reduxjs/toolkit';

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: [],
  },
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const {setPlaylists} = playlistsSlice.actions;
export default playlistsSlice.reducer;
