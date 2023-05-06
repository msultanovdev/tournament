import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import './Account.css';
import { Button } from "react-bootstrap";

const Account = () => {
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [playerLevel, setPlayerLevel] = useState('');
    const [age, setAge] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = jwt_decode(token);
        setMail(user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    }, []);

    return(
        <div className="account">
            <div className="account__container">
                <h2 className="account-title">Личный Кабинет</h2>
                <div className="account-info">
                    <h3>Мои данные:</h3>
                    <p>ФИО: {userName}</p>
                    <p>Номер телефона: {phone}</p>
                    <p>email: {mail}</p>
                    <p>Возраст: {age}</p>
                    <p>Уровень готовности: {playerLevel}</p>
                    <Button>Изменить</Button>
                </div>
            </div>
        </div>
    );
}

export default Account;