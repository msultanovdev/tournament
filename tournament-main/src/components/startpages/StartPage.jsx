import React from 'react';
import cl from './StartPage.module.css'
import image from "../../images/ping-pong-paddles 1.jpg"

const StartPage = () => {
  return (
    <>
      <div className={cl.btns}>
        <img src={image} className={cl.start}/>
      </div>
    </>
  );
};

export default StartPage;
