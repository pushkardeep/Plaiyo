import {createSlice} from '@reduxjs/toolkit';

const playingSlice = createSlice({
  name: 'playing',
  initialState: {
    isPlaying: false,
  },
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {setPlaying} = playingSlice.actions;
export default playingSlice.reducer;
