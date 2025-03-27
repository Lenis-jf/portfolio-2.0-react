import React, { useEffect, useState, useRef, useCallback } from 'react';

function CustomImageSlider(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesWrapperRef = useRef(null);
    const imgRefs = useRef([]);
    const leftArrowRef = useRef(null);
    const rightArrowRef = useRef(null);
    const radioButtonRefs = useRef([]);

    const goToPrevImage = () => {
        setCurrentIndex(prev => (prev === 0 ? props.images.length - 1 : prev - 1));
    };

    const goToNextImage = () => {
        setCurrentIndex(prev => (prev === props.images.length - 1 ? 0 : prev + 1));
    };

    const setImageRef = useCallback((element, index) => {
        imgRefs.current[index] = element;
    }, []);

    useEffect(() => {
        if (imagesWrapperRef.current && imgRefs.current[currentIndex]) {
            imagesWrapperRef.current.scrollTo({
                left: imgRefs.current[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
        }

        if (currentIndex === 0 && leftArrowRef.current) {
            leftArrowRef.current.classList.add("unenabled");
        } else if (currentIndex === props.images.length - 1 && rightArrowRef.current) {
            rightArrowRef.current.classList.add("unenabled");
        } else {
            leftArrowRef.current.classList.remove("unenabled");
            rightArrowRef.current.classList.remove("unenabled");
        }
    }, [currentIndex]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const visibleIndex = imgRefs.current.findIndex(
                            img => img === entry.target
                        );
                        if (visibleIndex !== -1) {
                            radioButtonRefs.current.forEach((button, index) => {
                                if (button) {
                                    button.classList.toggle("active", index === visibleIndex);
                                }
                            });
                        }

                        if (visibleIndex === 0 && leftArrowRef.current) {
                            leftArrowRef.current.classList.add("unenabled");
                        } else if (visibleIndex === props.images.length - 1 && rightArrowRef.current) {
                            rightArrowRef.current.classList.add("unenabled");
                        } else {
                            leftArrowRef.current.classList.remove("unenabled");
                            rightArrowRef.current.classList.remove("unenabled");
                        }
                    }
                });
            },
            {
                root: imagesWrapperRef.current,
                threshold: 0.5
            }
        );

        imgRefs.current.forEach(img => {
            if (img) observer.observe(img);
        });

        return () => {
            imgRefs.current.forEach(img => {
                if (img) observer.unobserve(img);
            });
        };
    }, []);

    return (
        <>
            <div className="img-presentator-container">
                <button
                    className="left-arrow arrow"
                    aria-label='Go to previous image'
                    onClick={goToPrevImage} ref={leftArrowRef}>
                </button>
                <div className="images-wrapper" ref={imagesWrapperRef}>
                    {props.images.map((img, index) => (
                        <img
                            loading='lazy'
                            key={img}
                            ref={(el) => setImageRef(el, index)}
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="img"
                        />
                    ))}
                </div>
                <button
                    className="right-arrow arrow"
                    aria-label="Go to next image"
                    onClick={goToNextImage}
                    ref={rightArrowRef}>
                </button>
            </div>
            <div className="radio-buttons-container">
                {props.images.map((_, index) => (
                    <button
                        key={index}
                        className={`radio-button ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index}`}
                        ref={el => radioButtonRefs.current[index] = el}
                    />
                ))}
            </div>
        </>
    );
}

export default CustomImageSlider;