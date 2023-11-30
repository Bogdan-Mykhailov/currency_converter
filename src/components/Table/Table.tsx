import {FC} from 'react';
import s from './Table.module.css';
import {getRoundedNumber} from "../../utils/helpers";
import {useAppSelector} from "../../services";
import {EditableSpan} from "../EditableSpan";

export const Table: FC = () => {
  const date = new Date();
  const currency = useAppSelector(state => state.currency.currencies)

  return (
    <table className={s.table}>
      <thead className={s.head}>
      <tr>
        <th>
          Currency {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
        </th>
        <th>Buy</th>
        <th>Sell</th>
      </tr>
      </thead>

      <tbody className={s.body}>
      {
        currency.map(({buy, ccy, sale, base_ccy}) => {
          return (
            <tr key={ccy}>
              <td>{`${ccy}/${base_ccy}`}</td>
              <td>
                <EditableSpan
                  value={getRoundedNumber(buy)}
                />
              </td>
              <td>
                <EditableSpan
                  value={getRoundedNumber(sale)}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};


