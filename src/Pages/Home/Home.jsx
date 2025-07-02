import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowitWorks';
import OurServices from './OurServices';
import Brand from './Brand';
import Benefits from './Benefits';
import BeAmerchants from './BeAmerchants';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <OurServices/>
            <Brand/>
            <Benefits/>
            <BeAmerchants/>
            <FAQ/>
        </div>
    );
};

export default Home;