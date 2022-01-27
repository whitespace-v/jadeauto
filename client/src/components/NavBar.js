import React, {useContext} from 'react';
import {Context} from "../index";
import classes from "../scss/NavBar.module.scss";
import logo from '../assets/original.png'
import inst from '../assets/inst.png'
import {observer} from "mobx-react-lite"; //needs to be optimized
import Layout from "../utils/Layout";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, JADE_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const NavBar = observer((userRole) => {

    const {user} = useContext(Context)     //needed just in components that rendered different depended on authorization
        const navigate = useNavigate()

        const logOut = () => {
            user.setUser({})
            user.setIsAuth(false)
            localStorage.removeItem('token')
        }
        return (
            <Layout>
                <div className={classes['NavBar']}>
                    <div className={classes['NavBar__logo']} onClick={() => navigate(JADE_ROUTE)}>
                        <div
                            className={classes['NavBar__logo-img']}
                            style={{backgroundImage: `url("${logo}")`}}
                        />
                        <p>Jade Auto</p>
                    </div>

                    <div className={classes['NavBar__nav']}>
                        <a
                            href={'https://instagram.com/jadeautovl'}
                            className={classes['NavBar__nav-inst']}
                            style={{
                                backgroundImage: `url("${inst}")`
                            }}
                        />
                        <div className={classes['NavBar__nav-phone']}>
                            {
                                window.document.documentElement.clientWidth > 500 ? <p>ТЕЛЕФОН:</p> : null
                            }
                            <a href="tel:+79089999929"> +7 (908) 999-99-29</a>
                        </div>
                        <div className={classes['NavBar__nav-spacer']}/>
                        {user.isAuth ?
                            <div className={classes['NavBar__nav-log']}>
                                {userRole.userRole === 'ADMIN' ? <p onClick={() => navigate(ADMIN_ROUTE)}>Admin</p> : null}
                                <p onClick={() => logOut()} >Выход</p>
                            </div>
                            :
                            <div className={classes['NavBar__nav-log']}>
                                <p onClick={() => navigate(LOGIN_ROUTE)}>Вход и регистрация</p>
                            </div>
                        }

                    </div>
                </div>
            </Layout>
        );
    }
)

export default NavBar;