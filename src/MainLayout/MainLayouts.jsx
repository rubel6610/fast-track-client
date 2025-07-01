import React from 'react';
import Navbar from '../Pages/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Home/Footer';

const MainLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto'>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </div>
    );
};

export default MainLayouts;