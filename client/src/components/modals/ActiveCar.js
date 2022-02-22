import React, { useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {createActive} from "../../http/carAPI";

const ActiveCar = ({visible,setCreateActiveVisible}) => {

    const [value,setValue] = useState(null)

    const addActiveStatus = (event) => {
        event.preventDefault()
        createActive({name: value}).then(() => {
            setValue('')
            setCreateActiveVisible(false)
            window.location.reload();
        });
    };

    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setCreateActiveVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Создать статус наличия машины</p>
                    <input type="text" placeholder={'Cтатус наличия'} onChange={e => setValue(e.target.value)}/>
                    <hr/>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={addActiveStatus}>Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default ActiveCar;
