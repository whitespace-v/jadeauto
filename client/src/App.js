import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import gif from './assets/loader.gif'
import classes from './scss/Jade.module.scss'

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)  // (is loading?) default -> loading (adding gif), check isAuth ? -> false
    const [userRole,setUserRole] = useState('')

    useEffect(() => {                               //send 1 time while app's opening
        check()
            .then(data => {                              //if check successful ->
                user.setUser(true)                               //user -> true
                user.setIsAuth(true)                              //authorization -> true
                setUserRole(data.role)
            })
            .finally(() => setLoading(false))                     //setLoading false anyway
    },[user])                                                 // dependencies, if null -> function will run only 1 time

    if (loading) {                                      //if loading -> loader
        return <div className={classes.loader}><img src={gif} alt=""/> </div>
    }

    return (
        <BrowserRouter>
            <NavBar
                userRole = {userRole}
            />
            <AppRouter/>
        </BrowserRouter>
    );

})

export default App;
