import axios from 'axios';
import React from 'react';
import UseAuth from './UseAuth';

const instance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
})

const UseAxiosSecure = () => {
    const {user}=UseAuth();
    instance.interceptors.request.use(config=>{
        config.headers.Authorization=`Bearer ${user.accessToken}`
        return config
    },error=>{
        return Promise.reject(error)
    })
    return instance;
};

export default UseAxiosSecure;