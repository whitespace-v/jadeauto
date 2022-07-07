import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {changeImages, fetchOneCar} from "../http/carAPI";
import Layout from "../utils/Layout";


const OneCarImages = observer(() => {
    const {id} = useParams();
    const [car, setCar] = useState({images: []});
    const [main, setMain] = useState('')
    const [currentImage, setCurrentImage] = useState(null)
    const [images,setImages] = useState([])
    useEffect( () => {
        fetchOneCar(id)
            .then(
                data => {
                    setCar(data)
                    setImages(data.images)
                    setMain(data.image)
                })

    },[id]);

    function dragStartHandler(e, image) {
        setCurrentImage(image)
    }

    function dragLeaveHandler(e) {
        e.target.style.border = '0px solid white'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.border = '1px solid #CD3319'
    }

    function dragEndHandler(e) {
        e.target.style.border = '0px solid white'
    }

    function dropHandler(e, image) {
        e.preventDefault()
        setImages(images.map(i => {
            if(i.id === image.id) {
                return {...i, id: currentImage.id}
            }
            if(i.id === currentImage.id) {
                return {...i, id: image.id}
            }
            return i
        }))
        e.target.style.border = '0px solid white'
    }

    const sortImages = (a,b) => {
        if(a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }

    const changeImagesHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Array.from(images).forEach(picture => {
            formData.append('pictures', picture.img);
            formData.append('indexes', picture.id);
        });
        formData.append( 'main', main)
        await changeImages(id, formData)
    }

    return (
        <Layout>
            <form action="">
                <div style={{color: 'white', display: 'block'}}>
                    <div> {car.manufacturerName} {car.nameName} {car.bodyNumber}-{car.price}руб.</div>
                    <img src={'https://jadeautovl.ru/'+ main} alt="" width={250} height={250}/>
                    <div style={{display: 'flex'}} >
                        {images.sort(sortImages).map(image => (
                            <div
                                key={image.img}
                                draggable={true}
                                onDragStart={e => dragStartHandler(e, image) }
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDragOver={e => dragOverHandler(e)}
                                onDrop={e => dropHandler(e, image)}
                                onClick={() => setMain(image.img)}
                            >
                                <img
                                    src={'https://jadeautovl.ru/' + image.img}
                                    alt="" width={100} height={100}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={changeImagesHandler}>Применить</button>
                </div>
            </form>
        </Layout>
    )
})

export default OneCarImages;
