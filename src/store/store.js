import { makeAutoObservable } from "mobx";

const token = localStorage.getItem('token');

export default class Store {
    user = {};
    isAuth = token ? true : false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

}