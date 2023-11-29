import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import users from '../../assets/icons/User.svg'
import s from './ActiveSessions.module.css'
import {URL} from "../../utils/constants";

const socket = io(URL);

export const ActiveSessions = () => {
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    socket.on('sessionCountUpdate', (count) => {
      setSessionCount(count);
    });

    socket.emit('getSessionCount');

    return () => {
      socket.off('sessionCountUpdate');
    };
  }, []);
  const title = `Online: ${sessionCount}`;

  return <div className={s.sessionInfo}>
    <img src={users} alt="users"/>
    <span>{title}</span>
  </div>;
};
