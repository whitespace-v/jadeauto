import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {Context} from "../../index";
import {changePrice} from "../../http/carAPI";

const PriceCar = ({visible,setPriceVisible}) => {

    const {car} = useContext(Context)
    const [selectedCar, setSelectedCar] = useState(null)
    const [price,setPrice] = useState(null)

    const ChangePriceCar = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('price', price)
        await changePrice(selectedCar, formData)
            .then( () => {
                setPriceVisible(false)
                window.location.reload();
                console.log(123)
            })
    }

    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setPriceVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Сменить цену машины</p>
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
                                    <span> : {Car.bodyNumber} : {Car.price} руб.</span>
                                    <input type="text" placeholder={'Цена машины'} onChange={e => setPrice(e.target.value)}/>
                                </div>)
                        }
                    </div>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={ChangePriceCar}>Поменять Цену</button>
                </form>
            </div>
        </div>
    );
}

export default PriceCar;
