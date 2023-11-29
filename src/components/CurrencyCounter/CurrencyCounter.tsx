import {ChangeEvent, FC, useEffect, useState} from 'react';
import s from './CurrencyCounter.module.css';
import swap from '../../assets/icons/swap.png';
import {useAppSelector} from '../../services';

export const CurrencyCounter: FC = () => {
  const currencies = useAppSelector((state) => state.currency.currencies);
  const [inputChange, setInputChange] = useState('1');
  const [inputGet, setInputGet] = useState('');
  const [selectedCurrencyChange, setSelectedCurrencyChange] = useState<string | undefined>("GBP");
  const [selectedCurrencyGet, setSelectedCurrencyGet] = useState<string>();

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
    e: ChangeEvent<HTMLSelectElement>,
    isChange: boolean
  ) => {
    if (isChange) {
      setSelectedCurrencyChange(e.target.value);
      if (e.target.value === selectedCurrencyGet) {
        setSelectedCurrencyGet('');
      }
    } else {
      setSelectedCurrencyGet(e.target.value);
      if (e.target.value === selectedCurrencyChange) {
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
        <input type="text" id="change" value={inputChange} onChange={handleInputChange}/>
      </div>
      <select value={selectedCurrencyChange} onChange={(e) => handleSelectChange(e, true)}>
        {currencies.map(({ccy}) => (
          <option key={ccy} disabled={ccy === selectedCurrencyGet} value={ccy}>
            {ccy}
          </option>
        ))}
      </select>

      <img className={s.swapIcon} src={swap} alt="Switch Icon" onClick={handleSwap}/>

      <div className={s.inputWrapper}>
        <label htmlFor="get">Get</label>
        <input type="text" id="get" value={inputGet} readOnly/>
      </div>
      <select value={selectedCurrencyGet} onChange={(e) => handleSelectChange(e, false)}>
        <option value=''>-</option>
        {currencies.map(({ccy}) => (
          <option key={ccy} disabled={ccy === selectedCurrencyChange} value={ccy}>
            {ccy}
          </option>
        ))}
      </select>

    </div>
  );
};
