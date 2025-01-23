import {createSlice} from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isRepeat: false,
    isShuffle: false,
    isPlaylist: false,
    playlistId: "",
    queueSongs: [],
  },

  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },

    setRepeat: (state, action) => {
      state.isRepeat = action.payload;
    },

    setShuffle: (state, action) => {
      state.isShuffle = action.payload;
    },

    setSongQueue: (state, action) => {
      state.queueSongs = action.payload;
    },

    setIsPlaylist: (state, action) => {
      state.isPlaylist = action.payload;
    },

    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
  },
});

export const {
  setCurrentSong,
  setRepeat,
  setShuffle,
  setSongQueue,
  setIsPlaylist,
  setPlaylistId,
} = playerSlice.actions;
export default playerSlice.reducer;
