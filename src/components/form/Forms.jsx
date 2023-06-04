import React, {useEffect, useRef, useState} from 'react';
import cl from "./forms.module.css"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../../modal/Modal";
import InputMask from 'react-input-mask';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';
import Loader from '../UI/Loader';
import { Button } from 'react-bootstrap';

const Forms = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameDirty, setNameDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [nameError, setNameError] = useState('Поле не может быть пустым')
  const [emailError, setEmailError] = useState('Поле не может быть пустым')
  const [phoneNumber, setPhoneNumber] = useState('')
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
  const [validForm, setValidForm] = useState(false)
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [numberPhoneValid, setNumberPhoneValid] = useState(false);
  const [ageValid, setAgeValid] = useState(false);
  const [levelValid, setLevelValid] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [enumGender, setEnumGender] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const passwordRef = useRef();

  useEffect(() => {
    if (emailError || nameError || numberPhoneError || ageError || levelError || genderError || !isTermsAgree) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [nameError, emailError, numberPhoneError, ageError, levelError, genderError, isTermsAgree]);

  const nameHandler = (e) => {
    setName(e.target.value);
    const splitedName = e.target.value.split(' ');
    if(splitedName.length < 3 || splitedName.length > 4) {
      setNameError('ФИО должно выглядить: Иванов Александр Маркович');
      setNameValid(false);
    } else {
      setNameError('')
      setNameValid(true)
    }
  }

  const passwordHideHandler = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
    if(!isPasswordVisible) {
      passwordRef.current.type = 'text';
    } else {
      passwordRef.current.type = 'password';
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
    setPhoneNumber(e.target.value)
    const reN = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
    if (!reN.test(String(e.target.value).toLowerCase()) && e.target.value.length > 17) {
      setNumberPhoneError('Некорректный номер телефона')
      setNumberPhoneValid(false)
    } else {
      setNumberPhoneError('')
      setNumberPhoneValid(true)
    }
  }

  const genderHandler = (e) => {
    setGender(e.target.value);
    if(e.target.value === 'male') {
      setEnumGender(0);
    } else {
      setEnumGender(1);
    }
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

  const passwordHandler = (e) => {
    setPassword(e.target.value);
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
        if (phoneNumber.length === 0) {
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
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const splitedName = name.split(' ');
    const formData = {
      firstName: splitedName[1],
      middleName: splitedName[0],
      lastName: splitedName[2],
      email,
      phoneNumber,
      password,
      gender: enumGender,
      age,
      sportsCategory: level
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/register`, formData);
      navigate('/login');
      console.log(response);
    } catch (error) {
      setEmailError(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={cl.form} 
      onSubmit={handleSubmit}
    >
      {isLoading && <div className='loader-wrapper'>
          <Loader />
        </div>}
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
      <div className={cl.passwordWrapper}>
        <input
          onChange={e => passwordHandler(e)}
          value={password}
          ref={passwordRef}
          name='password'
          type='password'
          placeholder="Пароль"
          className={`${cl.input}`}
        />
        <button className={cl.passwordBtn} onClick={(e) => passwordHideHandler(e)}>
          {!isPasswordVisible ? <EyeSlashFill width='100%' height="100%" /> : <EyeFill width='100%' height="100%" />}
        </button>
      </div>
      {(numberPhoneDirty && numberPhoneError) && <div style={{color: "red", marginBottom: 10}}>{numberPhoneError}</div>}
      <InputMask
        mask="7 (999) 999-99-99"
        onChange={e => numberPhoneHandler(e)}
        onBlur={e => blurHandler(e)}
        value={phoneNumber}
        name="numberPhone"
        className={`${cl.input} ${numberPhoneValid ? cl.valid : ''}`}
        type='tel'
        placeholder="Номер телефона"
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
        <option value="male">Мужчина</option>
        <option value="female">Женщина</option>
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
        <option>Мастер спорта</option>
        <option>Разряд</option>
        <option>Любитель</option>
        <option>Новичок</option>
      </select>
        <div className={cl.check__box}>
          <input
            className={cl.check}
            type="checkbox"
            value={isTermsAgree}
            onChange={(e) => setIsTermsAgree(e.target.checked)}
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
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 className={`${cl.modalTitle}`}>Согласие на обработку персональных данных</h2>
          <p className={`${cl.modalText}`}>
          Предоставляя свои персональные данные, Пользователь даёт согласие на обработку, хранение и использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г. в следующих целях:<br />
            - предоставления доступа к Сайту, его Содержанию и/или Сервису, к функционалу Сервиса, для администрирования Сайта;<br />
            - идентификации при регистрации на Сайте и/или при использовании Сервиса;<br />
            - оказания услуг, обработки запросов и заявок;<br />
            - установления обратной связи, включая направление уведомлений и запросов;<br />
            - подтверждения полноты предоставленных персональных данных;<br />
            - заключения договоров, осуществления взаиморасчетов;<br />
            - сбора Оператором статистики;<br />
            - улучшения качества работы Сайта и/или его Сервиса, удобства их использования и разработки новых сервисов и услуг;<br />
            Под персональными данными подразумевается любая информация личного характера, позволяющая установить личность Пользователя такая как:<br />
            - Фамилия, Имя, Отчество<br />
            - Дата рождения<br />
            - Контактный телефон<br />
            - Адрес электронной почты<br />
            - Почтовый адрес<br />
            Персональные данные Пользователей хранятся исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.
            Компания обязуется не передавать полученные персональные данные третьим лицам, за исключением следующих случаев:<br />
            - По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке, установленным законодательством РФ<br />
            - Стратегическим партнерам, которые работают с Компанией для предоставления продуктов и услуг, или тем из них, которые помогают Компании реализовывать продукты и услуги потребителям. Мы предоставляем третьим лицам минимальный объем персональных данных, необходимый только для оказания требуемой услуги или проведения необходимой транзакции.<br />
            Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий настоящих правил вступают в силу после их публикации на Сайте.<br />
            <Button style={{ margin: '0 auto'}}
              onClick={() => setModalActive(false)}
            >Закрыть</Button>
          </p>
        </div>
      </Modal>
      </form>
    );
  };

export default Forms;
