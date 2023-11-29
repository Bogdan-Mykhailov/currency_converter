import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {getRoundedNumber} from "../../utils/helpers";
import check from '../../assets/icons/Check.svg'
import cross from '../../assets/icons/Close.svg'
import s from './EditableSpan.module.css'

interface EditableSpanProps {
  value: string;
}

export const EditableSpan: FC<EditableSpanProps> = ({value}) => {
  const [isEditing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const [originalValue, setOriginalValue] = useState(value);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setEditing(true);
    setOriginalValue(editedValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  const saveUpdates = () => {
    setEditing(false);
  }

  const closeEditMode = () => {
    setEditing(false);
    setEditedValue(originalValue);
  };

  return isEditing ? (
    <div className={s.inputWrapper}>
      <input
        className={s.input}
        ref={inputRef}
        type="number"
        value={editedValue}
        onChange={handleChange}
        step={+value / 10}
      />
      <button
        className={s.button}
        onClick={saveUpdates}
        disabled={originalValue === editedValue}
      >
        <img className={s.icon} src={check} alt="check"/>
      </button>
      <button className={s.button} onClick={closeEditMode}>
        <img className={s.icon} src={cross} alt="cross"/>
      </button>
    </div>

  ) : (
    <div onDoubleClick={handleDoubleClick}>
      <span className={s.span}>{getRoundedNumber(editedValue)}</span>
    </div>
  );
};
