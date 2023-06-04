import { useEffect, useState, useRef } from "react";
import './Account.css';
import { Button } from "react-bootstrap";
import axios from "axios";
import InputMask from 'react-input-mask';
import Loader from "../../components/UI/Loader";

const Account = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(localUser);
    const [isChangeActive, setIsChangeActive] = useState(false);
    const [name, setName] = useState(`${user.middleName} ${user.firstName} ${user.lastName}`);
    const [phone, setPhone] = useState(`${user.phoneNumber}`);
    const [level, setLevel] = useState(`${user.sportsCategory}`);
    const [isLoading, setIsLoading] = useState(false);

    const accountNameRef = useRef();
    const accountPhoneRef = useRef();
    const accountLevelRef = useRef();

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/account/${localUser.id}`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            );
            setUser(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
        // const token = localStorage.getItem('token');
        // const user = jwt_decode(token);
        // setMail(user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    }, []);

    const changeButton = () => {
        accountNameRef.current.removeAttribute('readOnly');
        accountPhoneRef.current.children[1].removeAttribute('readOnly');
        accountLevelRef.current.removeAttribute('disabled');
        setIsChangeActive(true);
    }
    
    const cancelSave = () => {
        accountNameRef.current.setAttribute('readOnly', true);
        accountPhoneRef.current.children[1].setAttribute('readOnly', true);
        accountLevelRef.current.setAttribute('disabled', true);
        setName(`${user.firstName} ${user.middleName} ${user.lastName}`);
        setPhone(`${user.phoneNumber}`);
        setLevel(`${user.sportsCategory}`);
        setIsChangeActive(false);
    }

    const saveChanges = async () => {
        try {
            setIsLoading(true);
            const names = name.split(' ');
            const formData = [
            {
              op: "replace",
              path: "firstName",
              value: names[0]
            },
            {
              op: "replace",
              path: "middleName",
              value: names[1]
            },
            {
              op: "replace",
              path: "lastName",
              value: names[2]
            },
            {
              op: "replace",
              path: "gender",
              value: user.gender
            },
            {
              op: "replace",
              path: "phoneNumber",
              value: phone
            },
            {
              op: "replace",
              path: "sportsCategory",
              value: level
            },
          ];
            const {data} = await axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/account/${localUser.id}`, formData, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            console.log(data);
            localStorage.setItem('user', JSON.stringify({...data, id: localUser.id}));
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            accountNameRef.current.setAttribute('readOnly', true);
            accountPhoneRef.current.children[1].setAttribute('readOnly', true);
            accountLevelRef.current.setAttribute('disabled', true);
            setIsLoading(false);
            setIsChangeActive(false);
        }
    }

    return(
        <div className="account">
            <div className="account__container">
                <h2 className="account-title">Личный Кабинет</h2>
                <div className="account-info">
                {isLoading && <div className="loader-wrapper">
                        <Loader />
                        </div>}
                    <h3>Мои данные</h3>
                    <div className="account-info-wrapper">
                        <p>ФИО: </p>
                        <input 
                            ref={accountNameRef}
                            className="account-input" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            readOnly 
                        />
                    </div>
                    <div className="account-info-wrapper" ref={accountPhoneRef}>
                        <p>Номер телефона: </p>
                        <InputMask 
                            mask="7 (999) 999-99-99"
                            className="account-input" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            readOnly 
                        />
                    </div>
                    <div className="account-age-wrapper">
                        <p style={{display: 'flex', justifyContent: 'center'}}>Возраст: </p><p>{user.age}</p>
                    </div>
                    <div className="account-info-wrapper">
                        <p>Уровень готовности: </p>
                        <select 
                            name="level"
                            disabled
                            ref={accountLevelRef}
                            value={level}
                            onChange={e => setLevel(e.target.value)}
                        >
                            <option>Мастер спорта</option>
                            <option>Разряд</option>
                            <option>Любитель</option>
                            <option>Новичок</option>
                        </select>
                    </div>
                    {!isChangeActive ? 
                        <Button onClick={changeButton}>Изменить</Button> : 
                        <div className="save-buttons">
                            <Button variant="success" onClick={saveChanges}>Сохранить</Button>
                            <Button variant="danger" className="cancel-btn" onClick={cancelSave}>Отменить</Button>
                        </div>
                    }
                </div>
                <div className="account-info">
                    <h3>Мои рейтинг</h3>
                    <p className="account-info-rating">{user.currentRating}</p>
                </div>
            </div>
        </div>
    );
}

export default Account;