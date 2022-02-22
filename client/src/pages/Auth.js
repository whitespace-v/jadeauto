import React, {useState,useContext, useEffect} from 'react';
import classes from '../scss/Auth.module.scss'
import {JADE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import Layout from "../utils/Layout";
import {useLocation, useNavigate} from "react-router-dom";
import {registration,login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import InputMask from "react-input-mask";

const Auth = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useContext(Context)


    useEffect( () => {                                              //prevent first fetch = canceled
        if (user.isAuth) {
            navigate(JADE_ROUTE)
            .then(window.location.reload())
        }
    },[user,navigate])

    const click = async (event) => {
        event.preventDefault()
        try {
            if (isLogin) {
                await login(number, password);
            } else {
                await registration(number, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(JADE_ROUTE)
        } catch (e){
            e.response ? alert(e.response.data.message) : console.error('uncaught', e)
        }
    }

    return (
        <Layout>
            <div className={classes.Auth}>
                <div className={classes['Auth__page']}>
                    <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                    <div className={classes['Auth__form']}>
                        <form action="">
                            <p>Телефон</p>
                            <InputMask
                                type='text'
                                placeholder={'+7 (908) 999-99-29'}
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                mask="+7\(999) 999-9999"
                                maskChar=" "
                            />

                            <p>Пароль</p>
                            <input
                                type='password'
                                placeholder={'Введите пароль'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                maxLength="11"
                            />
                            <hr/>
                            <button
                                className={classes['Modal__data-button']}
                                onClick={click}
                            >{isLogin ? 'Войти' : 'Регистрация'}

                            </button>
                        </form>
                    </div>
                    <p>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</p>
                    {!isLogin ? <a href={LOGIN_ROUTE}>Войти</a> : <a href={REGISTRATION_ROUTE}>Регистрация</a>}
                </div>
            </div>
        </Layout>

    );

})

export default Auth;
