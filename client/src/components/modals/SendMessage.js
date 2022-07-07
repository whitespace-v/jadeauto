import React, {useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {useLocation} from 'react-router-dom'
import InputMask from "react-input-mask";

const SendMessage = ({visible,setSendMessageVisible,car}) => {
    const [value, setValue] = useState('');
    const location = useLocation()
    const sendMessage = async (event) => {
        event.preventDefault();
        value.match(/[0-9]/g).length === 11 ?
        await fetch(`${process.env.REACT_APP_API_URL}send-text?textmessage=https://jadeautovl.ru${location.pathname}&buyer=${value}&car=${car.manufacturerName} ${car.nameName}, ${car.bodyNumber}`)
            .then(alert('Вы успешно отправили заявку на покупку данного автомобиля!'))
            .then(setSendMessageVisible(false))
        :
        alert('Введите корректный телефон!')
    }
    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setSendMessageVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p style={{marginBottom: 10}}>Отправить заявку</p>
                    <InputMask
                        className={classes['SendMessage__input']}
                        value={value}
                        type="text"
                        placeholder={'Укажите ваш номер телефона'}
                        onChange={e => setValue(e.target.value)}
                        mask="+7\(999) 999-99-99"
                        maskChar=" "
                    />
                   <hr/>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={sendMessage}
                    >Отправить</button>
                </form>
            </div>
        </div>
    );
}

export default SendMessage;
