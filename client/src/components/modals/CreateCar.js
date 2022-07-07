import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import classes from "../../scss/Modal.module.scss";
import {createCar} from "../../http/carAPI";
import {observer} from "mobx-react-lite";
import imageCompression from 'browser-image-compression';

const CreateCar = observer(({visible,setCarVisible})=> {
    const {car} = useContext(Context);
    const [description,setDescription] = useState('');
    const [price,setPrice ] = useState('');
    const [mileage,setMileage ] = useState('');
    const [motor,setMotor ] = useState('')
    const [drive , setDrive] = useState('');
    const [city, setCity] = useState('Владивосток');
    const [year,setYear ] = useState('');
    const [video , setVideo] = useState(null);
    const [images , setImages] = useState([]);
    const [compressedImages, setCompressedImages] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [bodyNumber, setBodyNumber] = useState('');
    const [status, setStatus] = useState('');
    const options = { // compression options
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    const selectVideo = e => {
        setVideo(e.target.files[0]);
    };
    const selectImages = e =>{
        setImages(e.target.files);
    }
    const addCar = async (event) => {
        //remove common event behavior
        event.preventDefault()
        //compress images
        if (price && year && motor && drive && mileage && description
            && bodyNumber && images.length > 1 && car.selectedCarName.id && car.selectedManufacturer.id
        ) {
            for (let i = 0; i < images.length; i++){
                setPercentage(Math.round(i / images.length * 100))
                setStatus(`Сжатие изображений: ${i+1} / ${images.length}`)
                let compressed = await imageCompression(images[i], options)
                compressedImages.push(compressed)
            }
            //set Compressed images
            setCompressedImages(compressedImages)
            //append form
            setStatus('Загрузка данных')
            if (city === '') setCity('Алматы')
            const formData = new FormData()
            let date = new Date().toLocaleDateString()
            formData.append('nameName', car.selectedCarName.name)
            formData.append('manufacturerName', car.selectedManufacturer.name)
            formData.append('price', Number(price).toLocaleString('ru'))
            formData.append('manufacturerId', Number(car.selectedManufacturer.id))
            formData.append('carNameId', Number(car.selectedCarName.id))
            formData.append('year', year)
            formData.append('motor', motor)
            formData.append('drive', drive)
            formData.append('mileage', mileage)
            formData.append('city', city)
            formData.append('description', description)
            formData.append('date', date)
            formData.append('status', 'Active')
            formData.append('bodyNumber', bodyNumber)
            formData.append('video', video || 'empty')
            formData.append('image', compressedImages[0])
            setStatus('Загрузка изображений...')
            Array.from(compressedImages).forEach(image => {
                formData.append('images', image);
            });
            //send form-data and clear inputs
            setStatus('Отправка на сервер...')
            setPercentage(98)
            await createCar(formData).then(() => {
                setStatus('Успешно!')
                setPercentage(100)
                window.location.reload();
            })
        } else alert('Заполните все поля !')
    }
    return (
        <div
            className={visible ? classes['Modal'] + ' '+ classes['visible'] : classes['Modal']}
            onClick={() => setCarVisible(false)}
        >
            <div
                className={visible ? classes['Modal__data'] + ' '+ classes['visible'] : classes['Modal__data']}
                onClick={e => e.stopPropagation()}>
                <form>
                    {
                        percentage !== 0 ?
                            <div>
                                <p>{status}</p>
                                <div className={classes['Modal__data-statusbar']}>
                                    <div className={classes['Modal__data-statusbar-bar']}>
                                        <div
                                            className={classes['Modal__data-statusbar-bar-status']}
                                            style={{width: 1.59 * percentage}}
                                        />
                                        {/*159px = 100%*/}
                                    </div>
                                    <div className={classes['Modal__data-statusbar-percentage']}>
                                        {percentage + '%'}
                                    </div>
                                </div>
                            </div>

                            :
                            null
                    }

                    <b>{car.selectedManufacturer.name || "Выберите Производителя"}</b>
                    <div className={classes['select_container']}>

                        {
                            car.manufacturers.map(manufacturer =>
                                <div
                                    className={classes['select']}
                                    key={manufacturer.id}
                                    onClick={() => car.setSelectedManufacturer(manufacturer)}
                                    style={manufacturer.id === car.selectedManufacturer.id ?
                                        {borderBottom:"2px solid #CD3319"}: {borderBottom:"none"}}
                                >
                                    {manufacturer.name}
                                </div>)
                        }

                    </div>

                    <b>{car.selectedCarName.name || "Выберите название"}</b>

                    <div className={classes['select_container']}>
                        {
                            car.carNames.map(CarName =>
                                <div
                                    className={classes['select']}
                                    key={CarName.id}
                                    onClick={() => car.setSelectedCarName(CarName)}
                                    style={CarName.id === car.selectedCarName.id ?
                                        {borderBottom:"2px solid #CD3319"}: {borderBottom:"none"}}
                                >
                                    {CarName.name}
                                </div>)
                        }
                    </div>
                    <div
                        className={classes['Modal__data-inputs']}
                    >
                        <div className={classes['Modal__data-input']}>
                            <p>Стоимость:</p>
                            <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className={classes['Modal__data-input']}>
                            <p>Пробег:</p>
                            <input type="text" value={mileage} onChange={e => setMileage(e.target.value)}/>
                        </div>
                        <div className={classes['Modal__data-input']}>
                            <p>Двигатель:</p>
                            <input type="text" value={motor} onChange={e => setMotor(e.target.value)}/>
                        </div>
                        <div className={classes['Modal__data-input']}>
                            <p>Привод:</p>
                            <input type="text" value={drive} onChange={e => setDrive(e.target.value)}/>
                        </div>
                        <div className={classes['Modal__data-input']}>
                            <p>Наличие:</p>
                            <select name="" id="" onChange={e => setCity(e.target.value)}>
                                {car.statuses.map( status => {
                                    return (
                                        <option value={status.name} key={status.name}>{status.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={classes['Modal__data-input']}>
                            <p>Год:</p>
                            <input type="text" value={year} onChange={e => setYear(e.target.value)}/>
                        </div>

                        <div className={classes['Modal__data-input']}>
                            <p>Номер кузова:</p>
                            <input type="text" value={bodyNumber} onChange={e => setBodyNumber(e.target.value)}/>
                        </div>

                        <div className={classes['Modal__data-input']}>
                            <p>Описание:</p>
                            <textarea type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                    </div>


                    <label className={classes['Modal__data-upload']}>
                        <input
                            type="file"
                            onChange={e => selectVideo(e)}
                        />
                        { video ? video.name.substring(0,25) + '...': 'Добавить Видео'}
                    </label>

                    <label className={classes['Modal__data-upload']}>
                        <input
                            type="file"
                            multiple
                            onChange={e => selectImages(e)}
                        />
                        { images.length?  'Файлов: ' + images.length : 'Добавить фотографии'}
                    </label>

                    <hr/>
                    <button
                        className={classes['Modal__data-button']}
                        onClick={addCar}>Добавить</button>
                </form>
            </div>
        </div>
    );
})


export default CreateCar;
