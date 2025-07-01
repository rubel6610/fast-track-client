import React from 'react';
import banner1 from "../../assets/banner/banner1.png"
import banner2 from "../../assets/banner/banner2.png"
import banner3 from "../../assets/banner/banner3.png"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <Carousel showThumbs={false} autoPlay infiniteLoop className='my-10'>
                <div>
                    <img src={banner1} />
                  
                </div>
                <div>
                    <img src={banner2} />
                   
                </div>
                <div>
                    <img src={banner3}/>
                  
                </div>
            </Carousel>
    );
};

export default Banner;