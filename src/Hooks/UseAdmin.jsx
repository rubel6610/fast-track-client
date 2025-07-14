import React from 'react';
import UseAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';

const UseAdmin = () => {
    const {user,loading}=UseAuth();
    const AxiosSecure = UseAxiosSecure();
    const {data:isAdmin,isloading:adminLoading}=useQuery({
        queryKey:["admin",user?.email],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            const res = await AxiosSecure(`/users/admin-check?email=${user?.email}`);
            return res.data.isAdmin;
        }
    })
    return [isAdmin,adminLoading]
};

export default UseAdmin;