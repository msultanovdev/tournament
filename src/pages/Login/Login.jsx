import React, {useEffect, useState} from 'react';
import cl from "./Login.module.css"
import {Link} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [emailError, setEmailError] = useState('Поле не должно быть пустым')
  const [emailValid, setEmailValid] = useState(false)
  const [validInput, setValidInput] = useState(false)

  useEffect(() => {
    emailError ? setValidInput(false) : setValidInput(true)
  }, [emailError])


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

  function blurHandler(e) {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
    }
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
        <button
         className={cl.btn}
         disabled={!validInput}
         type='submit'
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
