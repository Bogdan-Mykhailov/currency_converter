import {ChangeEvent, FC, useEffect, useState} from 'react';
import s from './CurrencyCounter.module.css';
import swap from '../../assets/icons/Arrow.svg';
import {useAppSelector} from '../../services';

export const CurrencyCounter: FC = () => {
  const currencies = useAppSelector((state) => state.currency.currencies);
  const [inputChange, setInputChange] = useState('1');
  const [inputGet, setInputGet] = useState('187.6');
  const [selectedCurrencyChange, setSelectedCurrencyChange] = useState<string | undefined>("GBP");
  const [selectedCurrencyGet, setSelectedCurrencyGet] = useState<string | undefined>('JPY');

  useEffect(() => {
    calculateConversion();
  }, [inputChange, selectedCurrencyChange, selectedCurrencyGet]);

  const handleSwap = () => {

    const tempInputChange = inputChange;
    setInputChange(inputGet);
    setInputGet(tempInputChange);

    const tempSelectedCurrencyChange = selectedCurrencyChange;
    setSelectedCurrencyChange(selectedCurrencyGet);
    setSelectedCurrencyGet(tempSelectedCurrencyChange);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputChange(e.target.value);
  };

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    isChange: boolean
  ) => {
    if (isChange) {
      setSelectedCurrencyChange(event.target.value);
      if (event.target.value === selectedCurrencyGet) {
        setSelectedCurrencyGet('');
      }
    } else {
      setSelectedCurrencyGet(event.target.value);
      if (event.target.value === selectedCurrencyChange) {
        setSelectedCurrencyChange('');
      }
    }
  };

  const calculateConversion = () => {
    const inputChangeValue = parseFloat(inputChange) || 0;
    const selectedCurrencyChangeData = currencies.find(({ccy}) => ccy === selectedCurrencyChange);
    const selectedCurrencyGetData = currencies.find(({ccy}) => ccy === selectedCurrencyGet);

    if (selectedCurrencyChangeData && selectedCurrencyGetData) {
      const result =
        (inputChangeValue * parseFloat(selectedCurrencyChangeData.buy)) /
        parseFloat(selectedCurrencyGetData.sale);

      const roundedResult = parseFloat(result.toFixed(1));

      setInputGet(roundedResult.toString());
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.inputWrapper}>
        <label htmlFor="change">Change</label>
        <div className={s.currencyOption}>
          <input
            type="number"
            className={s.input}
            id="change"
            value={inputChange}
            onChange={handleInputChange}
          />
          <select
            className={s.select}
            value={selectedCurrencyChange}
            onChange={(event) => handleSelectChange(event, true)}
          >
            {currencies.map(({ccy}) => (
              <option key={ccy} disabled={ccy === selectedCurrencyGet} value={ccy}>
                {ccy}
              </option>
            ))}
          </select>
        </div>
      </div>

      <img
        className={s.swapIcon}
        src={swap}
        alt="Switch Icon"
        onClick={handleSwap}
      />

      <div className={s.inputWrapper}>
        <label htmlFor="get">Get</label>

        <div className={s.currencyOption}>
          <input
            className={s.input}
            id="get"
            value={inputGet}
            readOnly
          />
          <select
            className={s.select}
            value={selectedCurrencyGet}
            onChange={(event) => handleSelectChange(event, false)}
          >
            {currencies.map(({ccy}) => {

              return (
                <option
                  key={ccy}
                  disabled={ccy === selectedCurrencyChange}
                  value={ccy}
                >
                  {ccy}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
