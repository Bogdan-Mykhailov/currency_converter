import { configureStore } from '@reduxjs/toolkit';
import {currencySlice} from "./features";
import {appSlice} from "./features/app";


export const store = configureStore({
  reducer: {
    app: appSlice,
    currency: currencySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
