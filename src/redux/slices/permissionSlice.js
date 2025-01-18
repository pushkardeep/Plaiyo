import {createSlice} from '@reduxjs/toolkit';

const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    audioReadPermission: false,
  },
  reducers: {
    setPermission: (state, action) => {
      state.audioReadPermission = action.payload;
    },
  },
});

export const {setPermission} = permissionSlice.actions;
export default permissionSlice.reducer;
