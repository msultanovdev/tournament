import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(userName, password) {
        try {
            const res = await AuthService.login(userName, password);
            localStorage.setItem('token', res.data.accessToken);
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(firstName, middleName, lastName, phoneNumber, gender, birthDate, email, password, schoolNumber, rating) {
        try {
            const res = await AuthService.registration(firstName, middleName, lastName, phoneNumber, gender, birthDate, email, password, schoolNumber, rating);
            localStorage.setItem('token', res.data.accessToken);
            this.setAuth(true);
            this.setUser(res.data.user);
        } catch (e) {
            console.log(e);
        }
    }
}