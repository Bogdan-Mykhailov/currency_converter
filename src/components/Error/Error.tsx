import React from 'react';
import s from './Error.module.css'
import alert from '../../assets/icons/alert.png'

export const Error = () => {
  return (
     <div className={s.errorWrapper}>
       <img className={s.alert} src={alert} alt="alert"/>
       <h2 className={s.error}>
         Sorry, we were unable to retrieve the currency data due to an error.
       </h2>
     </div>
  );
};
