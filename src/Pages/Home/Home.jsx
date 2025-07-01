import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowitWorks';
import OurServices from './OurServices';
import Brand from './Brand';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <OurServices/>
            <Brand/>
        </div>
    );
};

export default Home;