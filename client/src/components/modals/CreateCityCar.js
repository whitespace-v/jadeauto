import React, {useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {createCityCar} from "../../http/carAPI";


const CreateCityCar = ({visible,setCreateCityCarVisible}) => {
    const [value, setValue] = useState('');
    const addManufacturer = (event) => {
        event.preventDefault()
        createCityCar({name: value}).then(() => {
            setValue('')
            setCreateCityCarVisible(false)
            window.location.reload();
        });
    };
    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setCreateCityCarVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Создать местоположение</p>
                    <input type="text" placeholder={'Местоположение'} onChange={e => setValue(e.target.value)}/>
                    <hr/>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={addManufacturer}>Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCityCar;