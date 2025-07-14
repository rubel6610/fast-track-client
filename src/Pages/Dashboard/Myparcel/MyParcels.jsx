import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import MyParcelsTable from './MyParcelsTable';
import { useQuery } from '@tanstack/react-query';

const MyParcels = () => {
    const {user}=UseAuth();
    const axiosSecure = UseAxiosSecure();
 const {data:parcels=[], refetch }=useQuery({
    queryKey:["my-parcels", user.email],
    queryFn:async ()=>{
        const res = await axiosSecure.get(`/my-parcels?email=${user.email}`,{
            headers:{
                Authorization:`Bearer ${user.accessToken}`
            }
        })
        return res.data;
    }
 });
 
    return (
        <div>
            <MyParcelsTable parcels={parcels} refetch={refetch}></MyParcelsTable>
        </div>
    );
};

export default MyParcels;