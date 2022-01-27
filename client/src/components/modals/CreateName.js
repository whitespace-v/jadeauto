import React, {useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {createCarName} from "../../http/carAPI";

const CreateName = ({visible,setNameVisible}) => {
    const [value, setValue] = useState('');

    const addCarName = (event) => {
        event.preventDefault();
        createCarName({name: value}).then(() => {
            setValue('')
            setNameVisible(false)
            window.location.reload();
        });
    };
        return (
            <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setNameVisible(false)}>
                <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                    <form action="">
                        <p>Создать Название машины</p>
                        <input type="text" placeholder={'Название машины'} onChange={e => setValue(e.target.value)}/>
                        <hr/>
                        <button
                            className={classes['Modal__data-button']}
                            onClick={addCarName}>Добавить</button>
                    </form>
                </div>
            </div>
        );
}

export default CreateName;