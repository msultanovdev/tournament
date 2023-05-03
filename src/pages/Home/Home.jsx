import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home__links">
          <Link to="login">Вход</Link>
          <Link to="form">Регистрация</Link>
          <Link to="competitions">Соревнования</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
