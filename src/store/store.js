import { makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode";
import { configure } from "mobx";

configure({
    enforceActions: "never",
});

const token = localStorage.getItem('token');
let role = "User";
if(token) {
    const user = jwtDecode(token);
    role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}

export default class Store {
    user = {};
    isAuth = token ? true : false;
    role = role;
    players = [];
    competitions = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setRole(role) {
        this.role = role;
    }

    setPlayers(players) {
        this.players = players;
    }

    setCompetitions(competitions) {
        this.competitions = competitions;
    }

}