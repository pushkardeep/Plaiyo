import {createSlice} from '@reduxjs/toolkit';

const playingSlice = createSlice({
  name: 'playing',
  initialState: {
    isPlaying: false,
    isPaused: false,
  },
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },

    setPause: (state, action) => {
      state.isPaused = action.payload;
    },
  },
});

export const {setPlaying, setPause} = playingSlice.actions;
export default playingSlice.reducer;
