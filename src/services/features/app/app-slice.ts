import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  isError: boolean;
  isEditMode: boolean;
  selectedItemId: string | null;
}

const initialState: AppState = {
  isLoading: false,
  isError: false,
  isEditMode: false,
  selectedItemId: null,
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

    setIsEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
      if (!action.payload) {
        state.selectedItemId = null;
      }
    },

    setSelectedItemId: (state, action: PayloadAction<string | null>) => {
      state.selectedItemId = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsError,
  setIsEditMode,
  setSelectedItemId,
} = app.actions;
export const appSlice = app.reducer;
