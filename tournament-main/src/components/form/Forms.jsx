import React, {useEffect, useState} from 'react';
import cl from "./forms.module.css"
import axios from "axios";
import {Link} from "react-router-dom";
import Modal from "../../modal/Modal";

const Forms = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameDirty, setNameDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [nameError, setNameError] = useState('Поле не может быть пустым')
  const [emailError, setEmailError] = useState('Поле не может быть пустым')
  const [numberPhone, setNumberPhone] = useState('')
  const [numberPhoneDirty, setNumberPhoneDirty] = useState(false)
  const [numberPhoneError, setNumberPhoneError] = useState('Поле не может быть пустым')
  const [age, setAge] = useState('')
  const [ageDirty, setAgeDirty] = useState(false)
  const [ageError, setAgeError] = useState('Поле не может быть пустым')
  const [level, setLevel] = useState('')
  const [levelDirty, setLevelDirty] = useState(false)
  const [levelError, setLevelError] = useState('Поле не может быть пустым')
  const [gender, setGender] = useState('')
  const [genderDirty, setGenderDirty] = useState(false)
  const [genderError, setGenderError] = useState('Поле не может быть пустым')
  const [genderValid, setGenderValid] = useState(false)
  const [whoAreYou, setWhoAreYou] = useState('')
  const [whoAreYouDirty, setWhoAreYouDirty] = useState(false)
  const [whoAreYouError, setWhoAreYouError] = useState('Поле не может быть пустым')
  const [whoAreYouValid, setWhoAreYouValid] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [numberPhoneValid, setNumberPhoneValid] = useState(false);
  const [ageValid, setAgeValid] = useState(false);
  const [levelValid, setLevelValid] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (emailError || nameError || numberPhoneError || ageError || levelError || genderError || whoAreYouError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [nameError, emailError, numberPhoneError, ageError, levelError, genderError, whoAreYouError])

  const nameHandler = (e) => {
    setName(e.target.value)
    if (e.target.value.length > 50) {
      setNameError('Некорректное ФИО')
      setNameValid(false)
    } else {
      setNameError('')
      setNameValid(true)
    }
  }

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

  const numberPhoneHandler = (e) => {
    setNumberPhone(e.target.value)
    const reN = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
    if (!reN.test(String(e.target.value).toLowerCase()) && e.target.value.length > 13) {
      setNumberPhoneError('Некорректный номер телефона')
      setNumberPhoneValid(false)
    } else {
      setNumberPhoneError('')
      setNumberPhoneValid(true)
    }
  }

  const genderHandler = (e) => {
    setGender(e.target.value)
    if (e.target.value.length !== '') {
      setGenderError('')
      setGenderValid(true)
    }
  }

  const ageHandler = (e) => {
    setAge(e.target.value)
    const ageRegex = /^\d{1,2}$|^\d{3}$/;
    if (!ageRegex.test(e.target.value)) {
      setAgeError('Некорректные данные')
      setAgeValid(false)
    } else {
      setAgeError('')
      setAgeValid(true)
    }
  }

  const levelHandler = (e) => {
    setLevel(e.target.value)
    if (e.target.value.length !== '') {
      setLevelError('')
      setLevelValid(true)
    }
  }

  const whoAreYouHandler = (e) => {
    setWhoAreYou(e.target.value)
    if (e.target.value.length !== '') {
      setWhoAreYouError('')
      setWhoAreYouValid(true)
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        if (name.length === 0) {
          setNameValid(false)
        }
        break
      case 'email':
        setEmailDirty(true)
        if(email.length === 0) {
          setEmailValid(false)
        }
        break
      case 'numberPhone':
        setNumberPhoneDirty(true)
        if (numberPhone.length === 0) {
          setNumberPhoneValid(false)
        }
        break
      case 'age':
        setAgeDirty(true)
        if (age.length === 0) {
          setAgeValid(false)
        }
        break
      case 'level':
        setLevelDirty(true)
        if (level.length === 0) {
          setLevelValid(false)
        }
        break
      case 'gender':
        setGenderDirty(true)
        break
      case 'who':
        setWhoAreYouDirty(true)
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name,
      email,
      numberPhone,
      gender,
      age,
      level,
      whoAreYou
    }

    return axios.post('http://localhost:3000/posts/1', formData)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form className={cl.form} onSubmit={handleSubmit}>
      <p className={cl.prr}>Регистрация</p>
      {(nameDirty && nameError) && <div style={{color: "red", marginBottom: 10}}>{nameError}</div>}
      <input
        onChange={e => nameHandler(e)}
        onBlur={e => blurHandler(e)}
        value={name}
        name='name'
        className={`${cl.input} ${nameValid ? cl.valid : ''}`}
        placeholder="ФИО"
      />
      {(emailDirty && emailError) && <div style={{color: "red", marginBottom: 10}}>{emailError}</div>}
      <input
        onChange={e => emailHandler(e)}
        onBlur={e => blurHandler(e)}
        value={email}
        name='email'
        className={`${cl.input} ${emailValid ? cl.valid : ''}`}
        placeholder="Email"
      />
      {(numberPhoneDirty && numberPhoneError) && <div style={{color: "red", marginBottom: 10}}>{numberPhoneError}</div>}
      <input
        onChange={e => numberPhoneHandler(e)}
        onBlur={e => blurHandler(e)}
        value={numberPhone}
        name="numberPhone"
        className={`${cl.input} ${numberPhoneValid ? cl.valid : ''}`}
        type='tel'
        placeholder="8**********"
      />
      {(genderDirty && genderError) && <div style={{color: 'red', marginBottom: 10}}>{genderError}</div>}
      <select
        onChange={e => genderHandler(e)}
        onBlur={e => blurHandler(e)}
        value={gender}
        className={`${cl.sel} ${genderValid ? cl.valid : ''}`}
        name="gender"
      >
        <option value="" disabled hidden defaultValue>
          Пол
        </option>
        <option value="option1">Мужчина</option>
        <option value="option2">Женщина</option>
      </select>
      {(ageDirty && ageError) && <div style={{color: 'red', marginBottom: 10}}>{ageError}</div>}
      <input
        onChange={e => ageHandler(e)}
        onBlur={e => blurHandler(e)}
        className={`${cl.input} ${ageValid ? cl.valid : ''}`}
        value={age}
        name="age"
        type="number"
        placeholder="Возраст"
      />
      {(levelDirty && levelError) && <div style={{color: 'red', marginBottom: 10}}>{levelError}</div>}
      <select
        onChange={e => levelHandler(e)}
        onBlur={e => blurHandler(e)}
        value={level}
        name="level"
        className={`${cl.sel} ${levelValid ? cl.valid : ''}`}
      >
        <option value="" disabled hidden defaultValue>
          Уровень подготовки
        </option>
        <option>МС</option>
        <option>Разряд</option>
        <option>Любитель</option>
        <option>Новичок</option>
      </select>
      {(whoAreYouDirty && whoAreYouError) && <div style={{color: 'red', marginBottom: 10}}>{whoAreYouError}</div>}
      <select
        onChange={e => whoAreYouHandler(e)}
        onBlur={e => blurHandler(e)}
        value={whoAreYou}
        name="who"
        className={`${cl.sel} ${whoAreYouValid ? cl.valid : ''}`}
      >
        <option value="" disabled hidden defaultValue>
          Роль
        </option>
        <option value="option1">Судья</option>
        <option value="option2">Участник</option>x`
        </select>
        <div className={cl.check__box}>
          <input
            className={cl.check}
            type="checkbox"
          />
          <label>Я согласен на обработку <Link onClick={() => setModalActive(true)} to="#">персональных данных</Link></label>
        </div>
        <button
          className={cl.bt}
          onClick={handleSubmit}
          disabled={!validForm}
          type="submit">
          Отправить
        </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <p>Тут будет текст о персональных данных, на данном этапе используются моковые данные чтобы просто занять используемое пространство</p>
      </Modal>
      </form>
    );
  };

export default Forms;
