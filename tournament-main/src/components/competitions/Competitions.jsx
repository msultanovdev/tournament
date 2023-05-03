import React from 'react';
import cl from "./competitions.module.css"
import {LinkContainer} from 'react-router-bootstrap'

const Competitions = () => {
  return (
    <div className={cl.com}>
      <h1 style={{marginBottom: 50}}>Соревнования</h1>
      <div>
        <LinkContainer to="/choice">
          <button className={cl.tur}>
            <h2>Турнир выходного дня. 1 тур</h2>
            <p style={{color: "white"}}>Дата проведения</p>
            <p style={{color: "white"}}>11.03.23-13.03.23</p>
          </button>
        </LinkContainer>
        <LinkContainer to="/form">
          <button
            className={cl.btn}
          >Регистрация
          </button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default Competitions;
