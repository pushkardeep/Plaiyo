import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSmallMenuOpen: false,
    smallMenuTarget: null,
  },
  reducers: {
    setIsSmallMenuOpen: (state, action) => {
      state.isSmallMenuOpen = action.payload;
    },
    setSmallMenuTarget: (state, action) => {
      state.smallMenuTarget = action.payload;
    },
  },
});

export const {setIsSmallMenuOpen, setSmallMenuTarget} = uiSlice.actions;
export default uiSlice.reducer;
