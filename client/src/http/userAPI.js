import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (number, password) => {
    const {data} = await $host.post('api/user/registration', {number, password, role: 'ADMIN'})  //CHANGE ROLE AND ADD MANUALY
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (number, password) => {
    const {data} = await $host.post('api/user/login', {number, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
