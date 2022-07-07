//mobx and data storage
import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore {
    constructor() {                     //calls with creating UserStore object
        this._isAuth = false           //"_" means unchangeable
        this._user= {}
        makeAutoObservable(this)        //with changing _isAuth & _user components will rerender
        this.checkValidToken = this.checkValidToken.bind(this)
    }

    checkValidToken() {
        let isExpired = false;
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()){
            isExpired = true;
        }

        return isExpired;
    }

            //ACTIONS - functions that change state
    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
            //COMPUTED FUNCTIONS - only called if internal variables have changed
    get isAuth(){               //get variables from state
        return this._isAuth
    }
    get user(){
        return this._user
    }

}