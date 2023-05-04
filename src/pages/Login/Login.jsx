import React, {useContext, useEffect, useState} from 'react';
import cl from "./Login.module.css"
import {Link} from "react-router-dom";
import axios from 'axios';
import { Context } from '../..';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('Поле не должно быть пустым');
  const [emailValid, setEmailValid] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const [password, setPassword] = useState('');

  const {store} = useContext(Context);

  useEffect(() => {
    emailError ? setValidInput(false) : setValidInput(true);
  }, [emailError]);


  const emailHandler = (e) => {
    setEmail(e.target.value)
    const reE = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!reE.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email')
      setEmailValid(false)
    } else {
      setEmailError('')
      setEmailValid(true)
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
    }
  }

  async function onLoginSubmit (e) {
    e.preventDefault();
    const formData = {
      userName: email,
      password: password
    }
    const {data} = await axios.post('https://08c4-178-178-88-29.ngrok-free.app/api/Auth/login', formData);
    localStorage.setItem('token', data.accessToken);
  }

  return (
    <div className={cl.entry}>
      <p className={cl.header}>Войдите в свою учетную запись,
        чтобы продолжить</p>
      <div className={cl.ob}>
        {(emailDirty && emailError) && <div style={{color: "red", marginBottom: 10, textAlign: 'center'}}>{emailError}</div>}
        <input
          onChange={e => emailHandler(e)}
          onBlur={e => blurHandler(e)}
          value={email}
          name='email'
          placeholder="Email"
          className={`${cl.input} ${emailValid ? cl.valid : ''}`}
        />
        <input
          onChange={e => passwordHandler(e)}
          value={password}
          name='password'
          placeholder="Пароль"
          className={`${cl.input}`}
        />
        <button
         className={cl.btn}
         disabled={!validInput}
         type='submit'
         onClick={() => store.login(userName, password)}
        >
          Продолжить
        </button>
        <p className={cl.pr}>
          У вас нет аккаута?  <Link to="/form">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
