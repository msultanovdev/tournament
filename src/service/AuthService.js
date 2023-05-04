import $api from "../http";

export default class AuthService {
    static async login(userName, password) {
        return $api.post('/login', {userName, password});
    }

    static async registration(firstName, middleName, lastName, phoneNumber, gender, birthDate, email, password, schoolNumber, rating) {
        return $api.post('/register', {firstName, middleName, lastName, phoneNumber, gender, birthDate, email, password, schoolNumber, rating});
    }
}