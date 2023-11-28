import {FC} from 'react';
import s from './CurrencyCounter.module.css';
import swap from '../../assets/icons/swap.png';

export const CurrencyCounter: FC = () => {

  return (
    <div className={s.wrapper}>
      <div className={s.inputWrapper}>
        <label htmlFor="change">Change</label>
        <input type="text" id="change" />
      </div>
      <select>
        <option value="UAH">UAH</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <img className={s.swapIcon} src={swap} alt="Switch Icon"/>
      <div className={s.inputWrapper}>
        <label htmlFor="get">Get</label>
        <input type="text" id="get" />
      </div>
      <select>
        <option value="UAH">UAH</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
};


