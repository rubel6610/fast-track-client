import React from 'react';
import Marquee from 'react-fast-marquee';
import amazon from "../../assets/brands/amazon.png"
import casio from "../../assets/brands/casio.png"
import moonstar from "../../assets/brands/moonstar.png"
import randstad from "../../assets/brands/randstad.png"
import start from "../../assets/brands/start.png"

const Brand = () => {
   const brands = [amazon,casio,moonstar,randstad,start]
    return (
        <div className='my-20 max-w-6xl mx-auto'>
            <h1 className='font-extrabold my-6 text-2xl text-center'>We've helped thousands of sales teams</h1>
           <Marquee speed={50} pauseOnHover>
            <div className='flex gap-10'>
                  {brands.map((brand,index)=>(
                    <div key={index}>
                        <img src={brand} alt="" />
                    </div>
                  ))}
            </div>
          
           </Marquee>
        </div>
    );
};

export default Brand;