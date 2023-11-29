import {FC} from 'react';
import s from './Footer.module.css';
import {paymentCards} from "../../utils/data";

export const Footer: FC = () => {
  const date = new Date();
  return (
    <footer className={s.footer}>
      <div className={s.footerWrapper}>
        <h4>{date.getFullYear()} © Currency converter</h4>
        <div className={s.cardsWrapper}>
          {paymentCards.map(({id, name}) => (
            <a key={id} href="/">
              <img src={name} alt="name"/>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
