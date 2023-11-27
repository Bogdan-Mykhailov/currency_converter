import {FC, ReactNode} from 'react';
import s from './Container.module.css';

interface Props {
  children: ReactNode
}

export const Container: FC<Props> = ({children}) => {

  return (
    <div className={s.container}>
      {children}
    </div>
  );
};
