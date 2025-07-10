import Lottie from "lottie-react";
import React from "react";
import { Outlet } from "react-router";
import authImage from "../../assets/Lottie/Authimage.json";

const AuthLayout = () => {
  return (
    
    <div className="min-h-screen hero">
      <div className="hero-content flex flex-col lg:flex-row-reverse justify-center">
        <div>
          <Lottie animationData={authImage} className="w-10/12"></Lottie>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
