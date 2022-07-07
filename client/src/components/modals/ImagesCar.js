import React, {useContext} from 'react';
import classes from "../../scss/Modal.module.scss";
import {Context} from "../../index";
import {CARIMAGES_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const ImagesCar = ({visible,setImagesVisible}) => {
    const navigate = useNavigate()
    const {car} = useContext(Context)
    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setImagesVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <p>Изменить изображения</p>
                <div className={classes['Delete__option']}>
                    {car.cars.map(Car =>
                        <div
                            className={classes['select']}
                            key={Car.id}
                            onClick={() => navigate(CARIMAGES_ROUTE + '/' + Car.id)}
                        >
                            <span>{Car.id}. </span>
                            <span>{Car.manufacturerName + ' ' + Car.nameName}</span>
                            <span> : {Car.bodyNumber}</span>
                            <img src={'https://jadeautovl.ru/' + Car.image} alt="" width={80} height={80}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImagesCar;
