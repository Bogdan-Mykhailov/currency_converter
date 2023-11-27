import React from 'react';
import s from './Error.module.css'

export const Error = () => {
  return (
      <h2 className={s.error}>
        Sorry, we were unable to retrieve the currency data due to an error.
      </h2>
  );
};
