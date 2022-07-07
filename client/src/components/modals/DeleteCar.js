import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {deleteCar} from "../../http/carAPI";
import {Context} from "../../index";
const CreateName = ({visible,setDeleteCarVisible}) => {

    const {car} = useContext(Context)
    const [selectedCar, setSelectedCar] = useState(null)

    const Delete = async (event) => {
        event.preventDefault();
        await deleteCar(selectedCar)
            .then( () => {
                setDeleteCarVisible(false)
                window.location.reload();
            })
    }
    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setDeleteCarVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Удалить Машину</p>
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
                                    <span>: {Car.bodyNumber}</span>
                                    <a href={`https://jadeautovl.ru/car/${Car.id}`}> Страница </a>
                                </div>)
                        }
                    </div>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={Delete}>Удалить</button>
                </form>
            </div>
        </div>
    );
}

export default CreateName;
