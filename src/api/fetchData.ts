import {CurrencyDataType} from "../utils/types";
import {currencies} from "../utils/data";

export const fetchCurrencyData = () => {
  return new Promise<CurrencyDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(currencies);
    }, 1000)
  })
};
