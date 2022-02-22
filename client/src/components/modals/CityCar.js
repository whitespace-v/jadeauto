import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {changeCity} from "../../http/carAPI";
import {Context} from "../../index";

const CityCar = ({visible,setCityCarVisible}) => {

    const {car} = useContext(Context)
    const [selectedCar, setSelectedCar] = useState(null)
    const [city,setCityCar] = useState(null)

    const ChangeCityCar = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (city === null) setCityCar('В наличии в Алмате')
        formData.append('status', city)
        await changeCity(selectedCar, formData)
            .then( () => {
                setCityCarVisible(false)
                window.location.reload();
            })
    }

    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setCityCarVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Изменить местоположение машины</p>
                    <div className={classes['Delete__option']}>
                        {
                            car.cars.map(Car =>
                                <div
                                    className={classes['select']}
                                    key={Car.id}
                                    onClick={() => {setSelectedCar(Car.id)}}
                                    style={Car.id === selectedCar ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                                >
                                    <span>{Car.id}. </span>
                                    <span>{Car.manufacturerName + ' ' + Car.nameName}</span>
                                    <span> : {Car.bodyNumber} : {Car.city}</span>
                                    <select name="" id="" onChange={e => setCityCar(e.target.value)}>
                                        {car.statuses.map((status, index) =>
                                            <option key={index} value={status.name}>{status.name}</option>
                                        )}
                                    </select>
                                </div>)
                        }
                    </div>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={ChangeCityCar}>Поменять статус</button>
                </form>
            </div>
        </div>
    );
}

export default CityCar;
