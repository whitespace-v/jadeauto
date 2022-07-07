import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {Context} from "../../index";
import {changeDescription} from "../../http/carAPI";

const DescriptionCar = ({visible,setDescriptionVisible}) => {

    const {car} = useContext(Context)
    const [selectedCar, setSelectedCar] = useState(null)
    const [description,setDescription] = useState(null)

    const ChangeDescriptionCar = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', description)
        await changeDescription(selectedCar, formData)
            .then( () => {
                setDescriptionVisible(false)
                window.location.reload();
            })
    }

    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setDescriptionVisible(false)}>
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
                                    <span> : {Car.bodyNumber}</span>
                                    <textarea disabled={true} value={Car.description}/>
                                    <textarea placeholder={'Новое Описание Машины'} onChange={e => setDescription(e.target.value)}/>
                                </div>)
                        }
                    </div>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={ChangeDescriptionCar}
                    >
                        Сменить описание
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DescriptionCar;
