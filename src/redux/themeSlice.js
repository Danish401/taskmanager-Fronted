// redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // Default theme is 'light'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState, // initialState includes mode: 'light'
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
