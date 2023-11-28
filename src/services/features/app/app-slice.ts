import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  isError: boolean;
}

const initialState: AppState = {
  isLoading: false,
  isError: false
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { setIsLoading, setIsError } = app.actions;
export const appSlice = app.reducer;
