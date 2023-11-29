import {CurrencyDataType} from "../utils/types";
import {currencies} from "../services";

export const fetchCurrencyData = async () => {
  let errorCounter = Number(sessionStorage.getItem('errorCounter')) || 0

  errorCounter++
  sessionStorage.setItem('errorCounter', errorCounter.toString());

  if (errorCounter % 5 === 0) {
    throw new Error('Failed to fetch data');
  }

  return new Promise<CurrencyDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(currencies);
    }, 1000)
  });
};
