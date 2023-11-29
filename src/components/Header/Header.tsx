import {FC} from 'react';
import s from './Header.module.css';
import logo from '../../assets/icons/money.png'
import {ActiveSessions} from "../ActiveSessions";

export const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.logoWrapper}>
        <a href="/">
          <img className={s.logo} src={logo} alt="Logo"/>
        </a>
        <h2>Currency Converter</h2>
      </div>
      <ActiveSessions/>
    </header>
  );
};
