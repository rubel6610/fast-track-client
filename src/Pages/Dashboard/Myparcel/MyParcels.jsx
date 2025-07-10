import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Card from './MyParcelsTable';
import { useQuery } from '@tanstack/react-query';

const MyParcels = () => {
    const {user}=UseAuth();
    const axiosSecure = UseAxiosSecure();
 const {data:parcels=[], refetch }=useQuery({
    queryKey:["my-parcels", user.email],
    queryFn:async ()=>{
        const res = await axiosSecure.get(`/my-parcels?email=${user.email}`)
        return res.data;
    }
 });
 
    return (
        <div>
            <Card parcels={parcels} refetch={refetch}></Card>
        </div>
    );
};

export default MyParcels;