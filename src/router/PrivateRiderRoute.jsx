import React, { Children } from 'react';
import UseUserRole from '../Hooks/UseUserRole';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Components/Loading';

const PrivateRiderRoute = ({children}) => {
    const {role,roleLoading}=UseUserRole();
    const {user,loading}=UseAuth();
    if(loading || roleLoading){
        return <Loading/>
    }
    if(user && role === "rider"){
        return children
    }
};

export default PrivateRiderRoute;