import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from "./Login.module.css"
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { Context } from '../..';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';
import Loader from '../../components/UI/Loader';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('Поле не должно быть пустым');
  const [emailValid, setEmailValid] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef();

  const navigate = useNavigate();

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

  async function onLoginSubmit () {
    const formData = {
      email: email,
      password: password
    }
    try {
      setIsLoading(true);
      const {data} = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/Auth/login`, formData);
      store.isAuth = true;
      store.setUser(data.user);
      const decodedToken = jwtDecode(data.accessToken);
      store.setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.accessToken);
      navigate('/');
    } catch (e) {
      console.log(e.response.data.message);
      setLoginError(e.response.data.message);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  }

  const passwordHideHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if(!isPasswordVisible) {
      passwordRef.current.type = 'text';
    } else {
      passwordRef.current.type = 'password';
    }
  }

  return (
    <div className={cl.entry}>
      {isLoading && <div className='loader-wrapper'>
          <Loader />
        </div>}
      <p className={cl.header}>Войдите в свою учетную запись,
        чтобы продолжить</p>
      <p style={{color: "red", textAlign: "center", fontSize: "18px"}}>{loginError}</p>
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
        <div className={cl.passwordWrapper}>
          <input
            onChange={e => passwordHandler(e)}
            value={password}
            type='password'
            ref={passwordRef}
            name='password'
            placeholder="Пароль"
            className={`${cl.input}`}
          />
          <button className={cl.passwordBtn} onClick={passwordHideHandler}>
            {!isPasswordVisible ? <EyeSlashFill width='100%' height="100%" /> : <EyeFill width='100%' height="100%" />}
          </button>
        </div>
        <button
         className={cl.btn}
         disabled={!validInput}
         type='submit'
         onClick={onLoginSubmit}
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
