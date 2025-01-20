import {createSlice} from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isRepeat: false,
    isShuffle: false,
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
  },
});

export const {setCurrentSong, setRepeat, setShuffle, setSongQueue} =
  playerSlice.actions;
export default playerSlice.reducer;
