import $api from "../http";

export default class AuthService {
    login = async (userName, password) => {
        return $api.post('/login', {userName, password});
    }

    registration = async (firstName, middleName, lastName, phoneNumber, gender, age, email, password, sportsCategory) => {
        return $api.post('/register', {firstName, middleName, lastName, phoneNumber, gender, age, email, password, sportsCategory});
    }
}