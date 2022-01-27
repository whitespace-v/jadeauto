import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {changeStatus} from "../../http/carAPI";
import {Context} from "../../index";

const StatusCar = ({visible,setStatusCarVisible}) => {

    const {car} = useContext(Context)
    const [selectedCar, setSelectedCar] = useState(null)
    const [statusCar,setStatusCar] = useState(null)

    const ChangeStatus = async (event) => {
        event.preventDefault();
        let value;
        statusCar === 'Active' ? value = 'Sold' :  value ='Active'
        const formData = new FormData();
        formData.append('status', value)
        await changeStatus(selectedCar, formData)
            .then( () => {
                setStatusCarVisible(false)
                window.location.reload();
            })
    }
    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setStatusCarVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Статус актуальности машины</p>
                    <div className={classes['Delete__option']}>
                        {
                            car.cars.map(Car =>
                                <div
                                    className={classes['select']}
                                    key={Car.id}
                                    onClick={() => {
                                        setSelectedCar(Car.id)
                                        setStatusCar(Car.status)
                                    }}
                                    style={Car.id === selectedCar ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                                >
                                    <span>{Car.id}. </span>
                                    <span>{Car.manufacturerName + ' ' + Car.nameName}</span>
                                    <span>: {Car.bodyNumber}</span>
                                    {Car.status === 'Active' ?
                                        <span> - В продаже</span>
                                        :
                                        <span> - Продана </span>
                                    }
                                    <a href={`http://localhost:3000/car/${Car.id}`}> Страница </a>
                                </div>)
                        }
                    </div>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={ChangeStatus}>Поменять статус</button>
                </form>
            </div>
        </div>
    );
}

export default StatusCar;