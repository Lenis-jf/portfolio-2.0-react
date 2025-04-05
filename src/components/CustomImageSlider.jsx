import React, { useEffect, useState, useRef, useCallback } from 'react';

function CustomImageSlider(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesWrapperRef = useRef(null);
    const imgRefs = useRef([]);
    const leftArrowRef = useRef(null);
    const rightArrowRef = useRef(null);
    const radioButtonRefs = useRef([]);
    const visibleIndexRef = useRef(0);
    const isProgrammaticScroll = useRef(null);

    const goToPrevImage = () => {
        isProgrammaticScroll.current = true;    
        setCurrentIndex(prev => (prev === 0 ? prev : prev - 1));
        setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 200);
    };

    const goToNextImage = () => {
        isProgrammaticScroll.current = true;
        setCurrentIndex(prev => (prev === props.images.length - 1 ? prev : prev + 1));
        setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 200);
    };

    const setImageRef = useCallback((element, index) => {
        imgRefs.current[index] = element;
    }, []);

    const updateVisibleIndex = (index) => {
        visibleIndexRef.current = index;
        setCurrentIndex(index);
    };

    const goToIndex = (index) => {
        isProgrammaticScroll.current = true;
        setCurrentIndex(index);
        updateVisibleIndex(index);
        setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 200);
    }

    useEffect(() => {
        if(!isProgrammaticScroll.current) return;

        if (imagesWrapperRef.current && imgRefs.current[currentIndex]) {
            imagesWrapperRef.current.scrollTo({
                left: imgRefs.current[currentIndex].offsetLeft,
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [currentIndex]);

    useEffect(() => {
        leftArrowRef.current?.classList.toggle("disabled", currentIndex === 0);
        rightArrowRef.current?.classList.toggle(
            "disabled",
            currentIndex === props.images.length - 1
        );

        radioButtonRefs.current.forEach((button, index) => {
            if(button) button.classList.toggle("active", index === currentIndex);
        });
    }, [currentIndex, props.images.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isProgrammaticScroll.current) return;

                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const newIndex = imgRefs.current?.findIndex(img => img === entry.target);
                        
                        console.log("new-index: ", newIndex);

                        updateVisibleIndex(newIndex);
                    }
                });
            },
            {
                root: imagesWrapperRef.current,
                threshold: 0.3
            }
        );

        imgRefs.current.forEach(img => {
            if(img) observer.observe(img);
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
                    onClick={goToPrevImage}
                    ref={leftArrowRef}
                    aria-label="Previous image"
                />
                <div className="images-wrapper" ref={imagesWrapperRef}>
                    {props.images.map((img, index) => (
                        <img
                            key={img}
                            ref={el => setImageRef(el, index)}
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="img"
                            loading="lazy"
                        />
                    ))}
                </div>
                <button
                    className="right-arrow arrow"
                    onClick={goToNextImage}
                    ref={rightArrowRef}
                    aria-label="Next image"
                />
            </div>
            <div className="radio-buttons-container">
                {props.images.map((_, index) => (
                    <button
                        key={index}
                        ref={el => radioButtonRefs.current[index] = el}
                        className={`radio-button`}
                        onClick={() => goToIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
}

export default CustomImageSlider;