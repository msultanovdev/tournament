import { useEffect, useState, useRef } from "react";
import jwt_decode from "jwt-decode";
import './Account.css';
import { Button } from "react-bootstrap";
import axios from "axios";

const Account = () => {
    const [isChangeActive, setIsChangeActive] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState(`${user.firstName} ${user.middleName} ${user.lastName}`);
    const [phone, setPhone] = useState(`${user.phoneNumber}`);
    const [level, setLevel] = useState(`${user.sportsCategory}`);

    const accountNameRef = useRef();
    const accountPhoneRef = useRef();
    const accountLevelRef = useRef();


    useEffect(() => {
        // const token = localStorage.getItem('token');
        // const user = jwt_decode(token);
        // setMail(user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    }, []);

    const changeButton = () => {
        accountNameRef.current.removeAttribute('readOnly');
        accountPhoneRef.current.removeAttribute('readOnly');
        accountLevelRef.current.removeAttribute('disabled');
        setIsChangeActive(true);
    }
    
    const cancelSave = () => {
        accountNameRef.current.setAttribute('readOnly', true);
        accountPhoneRef.current.setAttribute('readOnly', true);
        accountLevelRef.current.setAttribute('disabled', true);
        setName(`${user.firstName} ${user.middleName} ${user.lastName}`);
        setPhone(`${user.phoneNumber}`);
        setLevel(`${user.sportsCategory}`);
        setIsChangeActive(false);
    }

    const saveChanges = async () => {
        try {
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
            const {data} = await axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/account/${user.id}`, formData, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            console.log(data);
            localStorage.setItem('user', JSON.stringify({...data, id: user.id}));
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            accountNameRef.current.setAttribute('readOnly', true);
            accountPhoneRef.current.setAttribute('readOnly', true);
            accountLevelRef.current.setAttribute('disabled', true);
            setIsChangeActive(false);
        }
    }

    return(
        <div className="account">
            <div className="account__container">
                <h2 className="account-title">Личный Кабинет</h2>
                <div className="account-info">
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
                    <div className="account-info-wrapper">
                        <p>Номер телефона: </p>
                        <input 
                            ref={accountPhoneRef}
                            className="account-input" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            readOnly 
                        />
                    </div>
                    <p>Возраст: {user.age}</p>
                    <div className="account-info-wrapper">
                        <p>Уровень готовности: </p>
                        <select 
                            name="level"
                            disabled
                            ref={accountLevelRef}
                            value={level}
                            onChange={e => setLevel(e.target.value)}
                        >
                            <option>Мастер Спорта</option>
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
                    <p className="account-info-rating">2200</p>
                </div>
            </div>
        </div>
    );
}

export default Account;