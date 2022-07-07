import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {deleteCarName} from "../../http/carAPI";
import {Context} from "../../index";

const CreateName = ({visible,setDeleteCarNameVisible}) => {

    const {car} = useContext(Context)
    const [selectedCarName, setSelectedCarName] = useState(null)

    const Delete = async (event) => {
        event.preventDefault();
        await deleteCarName(selectedCarName.id)
            .then( () => {
                setDeleteCarNameVisible(false)
                setSelectedCarName('all')
                window.location.reload();
            })
    }
    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setDeleteCarNameVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Название машины</p>
                    <small style={{color: '#fa0000cc'}}><span>Будьте внимательны! </span> <br/>не удаляйте задействованное название</small>
                    <div className={classes['select_container']}>
                        {
                            car.carNames.map(carName =>
                                <div
                                    className={classes['select']}
                                    key={carName.id}
                                    onClick={() => {
                                        car.setSelectedCarName(carName)
                                        setSelectedCarName(carName)
                                    }

                                    }
                                    style={carName.id === car.selectedCarName.id ? {borderBottom:"2px solid #CD3319"}: {borderBottom:"none"}}
                                >
                                    {carName.name}
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