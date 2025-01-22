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

    removeDeletedPlaylistSongs: (state, action) => {
      const songIdsToRemove = action.payload.map(song => song.id);

      state.playlists = state.playlists.map(playlist => {
        const updatedSongs = playlist.songs.filter(
          song => !songIdsToRemove.includes(song.id),
        );

        return {
          ...playlist,
          songs: updatedSongs,
        };
      });
    },
  },
});

export const {createPlaylists, removeDeletedPlaylistSongs} =
  playlistsSlice.actions;
export default playlistsSlice.reducer;
