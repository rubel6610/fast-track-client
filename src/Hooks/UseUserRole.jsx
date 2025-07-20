import React from 'react';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseUserRole = () => {
    const {user,loading}=UseAuth();
    const axiosSecure = UseAxiosSecure();
    const {data:role=undefined,isLoading:roleLoading,isError}=useQuery({
        queryKey:["userRole", user?.email],
        enabled:!!user?.email && !loading,
        queryFn:async()=>{
            const res = await axiosSecure(`/users/role-check?email=${user?.email}`)
            return res.data.role;
        }
    })
    return {role,roleLoading,isError}
};

export default UseUserRole;