import React from 'react';

const Description = () => {
  return (
    <div style={{marginTop: 200}}>
      Вы тренер команды из хоккея, футбола, баскетбола, волейбола, гандбола, мини-футбола?
      Вы хотите увидеть разность, создаваемую каждым игроком Вашей команды?
      Вы хотите из нескольких десятков игроков отобрать самых сильных?
      Вы хотите восполнить дефицит игровой практики команды очень содержательными играми?
      Этот сайт Вам поможет в этом.

      В ходе такой игры составы команд меняются каждые несколько минут. Каждый игрок команды сыграет с каждым их остальных равное число микроматчей в качестве партнера и в качестве соперника. В итоге Вы увидите созданную им разность. Эта разность будет стимулом для игрока в таких играх. Он будет пытаться ее улучшить. В результате игроки будут играть с полной самоотдачей. Темпы роста его мастерства резко вырастут. Вы восполните дефицит игровой практики.

      Эта таблица показывает насколько равномерно удалось распределить игроков по микроматчам в заданных Вами условиях. Число в ячейке означает разницу между числом микроматчей где два указанных игрока были партнерами и соперниками. На поле партнеров на 1 меньше, чем соперников. Поэтому идеально если такое число равно -1. Отклонение от этого числа – погрешность от небольшого числа микроматчей, которую не удалось устранить.
    </div>
  );
};

export default Description;
