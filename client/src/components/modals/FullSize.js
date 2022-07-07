import React, {useState} from 'react';
import classes from '../../scss/FullSize.module.scss'

const FullSize = ({visible,setFullSizeVisible, selectedImg, setSelectedImg, images}) => {
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchEndY, setTouchEndY] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const handleTouchStart = e => {
        setTouchStartX(e.targetTouches[0].clientX)
        setTouchStartY(e.targetTouches[0].clientY)
    }
    const handleTouchMove = e => {
        setTouchEndX(e.targetTouches[0].clientX)
        setTouchEndY(e.targetTouches[0].clientY)
    }

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 30) {
            NextImage();
        }
        if (touchStartX - touchEndX < -30) {
            PreviousImage();
        }
        if (touchStartY - touchEndY > 70) {
            setFullSizeVisible(false)
        }
    }

    const PreviousImage = () => {
        if (selectedImg !== 0) {
            setSelectedImg(selectedImg - 1)
        } else setSelectedImg(images.length - 1)
    }

    const NextImage = () => {
        if (selectedImg < images.length - 1) {
            setSelectedImg(selectedImg + 1)
        } else setSelectedImg(0)
    }

    return (
        <div
            className={visible ? classes['FullSize'] + ' ' + classes['visible'] : classes['FullSize']}
            onClick={() => setFullSizeVisible(false)}
        >
            <div
                className={classes['FullSize__data']}
                onClick={e => e.stopPropagation()}
            >
                <div className={classes['FullSize__data-navbar']} >
                    <p className={classes['FullSize__data-navbar-counter']} > {selectedImg + 1} / {images.length}</p>
                    <svg
                        className={classes['FullSize__data-navbar-cross']}
                        onClick={() => setFullSizeVisible(false)}
                        width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M76 25.64L70.36 20L48 42.36L25.64 20L20 25.64L42.36 48L20 70.36L25.64 76L48 53.64L70.36
                         76L76 70.36L53.64 48L76 25.64Z" fill="white"/>
                    </svg>
                </div>
                <div
                    className={classes['FullSize__data-container']}
                >
                    {/** arrow left**/}
                    <div className={classes['FullSize__data-container-arrow-container']} onClick={() => PreviousImage()}>
                        <svg className={classes['FullSize__data-container-arrow-left']} width="47" height="80" viewBox="0 0 47 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.68 7.4799L39.6 0.399902L0 39.9999L39.6 79.5999L46.68 72.5199L14.16 39.9999L46.68 7.4799Z" fill="white"/>
                        </svg>
                    </div>

                    {/** image **/}
                    {images[selectedImg] ?
                        <div
                            className={classes['FullSize__data-container-image']}
                            style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${images[selectedImg].img}")`}}
                            onTouchMove={e => handleTouchMove(e)}
                            onTouchStart={e => handleTouchStart(e)}
                            onTouchEnd={e => handleTouchEnd(e)}
                        />
                        : null
                    }

                    {/** arrow right**/}
                    <div className={classes['FullSize__data-container-arrow-container']} onClick={() => NextImage()}>
                        <svg className={classes['FullSize__data-container-arrow-right']} width="47" height="80" viewBox="0 0 47 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.519531 8.48L32.0395 40L0.519531 71.52L8.99953 80L48.9995 40L8.99953 0L0.519531 8.48Z" fill="white"/>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default FullSize;