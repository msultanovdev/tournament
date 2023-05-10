import React, { useContext } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Context } from '../..';

const Home = () => {
  const {store} = useContext(Context);
  return (
    <>
      <div className="home">
        <div className="home-mask"></div>
        <div className="home__links">
          {!store.isAuth && <Link to="login">Вход</Link>}
          {!store.isAuth && <Link to="form">Регистрация</Link>}
          {store.role === 'Referee' && <Link to="participants">Участники</Link>}
          <Link to="competitions">Соревнования</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
