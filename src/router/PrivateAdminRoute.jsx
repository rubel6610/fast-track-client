import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import UseAdmin from '../Hooks/UseAdmin';
import Loading from '../Components/Loading';
import { Navigate } from 'react-router';
import Unauthorized from '../Pages/Unauthorized/UnAuthorized';

const PrivateAdminRoute = ({children}) => {
    const {user,loading}=UseAuth();
    const [isAdmin,adminLoading]=UseAdmin();

    if(loading || adminLoading){
        return <Loading/>
    }
    if(user && isAdmin){
        return  children;
    }
    return <Unauthorized/>
};

export default PrivateAdminRoute;