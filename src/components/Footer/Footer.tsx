import { FC } from 'react';
import s from './Footer.module.css';

export const Footer: FC = () => {
  const date = new Date();
  return (
    <footer className={s.footer}>
      <h4>{date.getFullYear()} © Currency converter</h4>
    </footer>
  );
};
