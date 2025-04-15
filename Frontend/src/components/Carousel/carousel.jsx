import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';


const carousel = () => {

    const images = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    return (
        <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={5000}
                showThumbs={false}
                showStatus={false}
                transitionTime={1000}
                className="w-full h-full"
                swipeable={true}
                emulateTouch={true}
                // This ensures a right-to-left sliding animation
                swipeScrollTolerance={5}
                // Direction right slide effect
                stopOnHover={false}
                // Always go forward (to the right) when cycling back to first slide
                axis="horizontal"
                // Use slide animation instead of fade
                animationHandler="slide"
            >
            {images.map((image, index) => (
                <div key={index} className="h-screen">
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </Carousel>
        </div >
    )
}

export default carousel
