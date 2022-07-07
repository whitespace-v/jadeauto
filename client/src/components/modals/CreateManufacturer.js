import React, {useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {createManufacturer} from "../../http/carAPI";


const CreateManufacturer = ({visible,setManufacturerVisible}) => {
    const [value, setValue] = useState('');
    const addManufacturer = (event) => {
        event.preventDefault()
        createManufacturer({name: value}).then(() => {
            setValue('')
            setManufacturerVisible(false)
            window.location.reload();
        });
    };
        return (
            <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setManufacturerVisible(false)}>
                <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                    <form action="">
                        <p>Создать Производителя</p>
                        <input type="text" placeholder={'Производитель'} onChange={e => setValue(e.target.value)}/>
                        <hr/>
                        <button
                            className={classes['Modal__data-button']}
                            onClick={addManufacturer}>Добавить</button>
                    </form>
                </div>
            </div>
        );
}

export default CreateManufacturer;