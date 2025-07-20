import axios from 'axios';
import { useEffect } from 'react';
import UseAuth from './UseAuth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const UseAxiosSecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    const interceptor = instance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Cleanup to avoid stacking interceptors
    return () => {
      instance.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return instance;
};

export default UseAxiosSecure;
