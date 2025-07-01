import React from 'react';
import logo from '../assets/logo.png'

const ProfastLogo = () => {
    return (
        <div className='flex items-center'>
            <img src={logo} alt="Logo" />
            <h1 className='font-extrabold mt-5 -ml-4 text-2xl'>Fast-Track</h1>
        </div>
    );
};

export default ProfastLogo;