import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UseAuth = () => {
    const useAuth = useContext(AuthContext)
    return useAuth;
};

export default UseAuth;