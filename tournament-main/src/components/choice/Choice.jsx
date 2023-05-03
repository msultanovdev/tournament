import React from 'react';
import cl from './choice.module.css'


const Choice = () => {
  return (
    <div className={cl.ch}>
      <h1>Турнир выходного дня</h1>
      <div>
          <button style={{marginBottom: 20}} className={cl.btn}>
            <h2>Расписание</h2>
          </button>
          <button className={cl.btn}>
            <h2>Рейтинг участников</h2>
          </button>
      </div>
    </div>
  );
};

export default Choice;
