import { FC } from 'react';
import s from './Header.module.css';

export const Header: FC = () => {
  return (
    <header className={s.header}>
      <h2>Currency Converter</h2>
    </header>
  );
};
