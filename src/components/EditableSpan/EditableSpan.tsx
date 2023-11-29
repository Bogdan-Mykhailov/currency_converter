import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {getRoundedNumber} from "../../utils/helpers";
import check from '../../assets/icons/Check.svg'
import edit from '../../assets/icons/Edit.svg'
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
  const [isHovered, setIsHovered] = useState(false);

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
    <>
      <input
        className={s.input}
        ref={inputRef}
        type="number"
        value={editedValue}
        onChange={handleChange}
        step={+value / 10}
      />
      <button
        onClick={saveUpdates}
        disabled={originalValue === editedValue}
      >
        <img className={s.checkIcon} src={check} alt="check"/>
      </button>
      <button onClick={closeEditMode}>
        <img className={s.crossIcon} src={cross} alt="cross"/>
      </button>
    </>

  ) : (
    <div
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={s.span}
      >
        {getRoundedNumber(editedValue)}
      </span>
      {isHovered && (
        <img className={s.editIcon} src={edit} alt="edit" />
      )}
    </div>
  );
};
