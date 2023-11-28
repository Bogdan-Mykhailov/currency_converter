import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CurrencyDataType} from "../../../utils/types";

interface CurrencyState {
  currencies: CurrencyDataType[];
}

const initialState: CurrencyState = {
  currencies: [],
};

const currency = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrencyRates: (state, action: PayloadAction<CurrencyDataType[]>) => {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencyRates } = currency.actions;
export const currencySlice = currency.reducer;
