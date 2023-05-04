import $api from "../http";

export default class AuthService {
    static async login(userName, password) {
        return $api.post('/login', {userName, password});
    }

    static async registration(firstName, middleName, lastName, phoneNumber, gender, age, email, password, sportsCategory) {
        return $api.post('/register', {firstName, middleName, lastName, phoneNumber, gender, age, email, password, sportsCategory});
    }
}