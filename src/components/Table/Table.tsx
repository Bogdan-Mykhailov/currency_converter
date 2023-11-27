import {FC} from 'react';
import s from './Table.module.css';
import {convertToNumber} from "../../utils/helpers";
import {Spinner} from '../Spinner';
import {Error} from '../Error';
import {CurrencyDataType} from "../../utils/types";

interface Props {
  currency: CurrencyDataType[]
  isLoading: boolean
  isError: boolean
}

export const Table: FC<Props> = (
  {
    currency,
    isLoading,
    isError
  }) => {
  const date = new Date();

  return (
    <>
      {
        isLoading
          ? <Spinner/>
          : <div>
            {
              isError
                ? <Error/>
                : <div className={s.tableWrapper}>
                  <table className={s.table}>
                    <thead className={s.head}>
                    <tr>
                      <th>
                        Currency / {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
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
                            <td>{convertToNumber(buy)}</td>
                            <td>{convertToNumber(sale)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
            }
          </div>
      }
    </>
  );
};


