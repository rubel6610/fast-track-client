import React from "react";
import DashBoardAside from "./DashBoardAside";
import { Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import DashboardAside from "./DashBoardAside";
import Navbar from "../../Components/Navbar";

const Dashboard = () => {
  
  return (
    <div>
      <Navbar/>
       <div className="flex min-h-screen">
    <div className="">
           <DashboardAside />
    </div>
   
      <div className="flex-1 flex flex-col min-h-screen">
      <Outlet/>
      </div>
    </div>
    </div>
 
  );
};

export default Dashboard;
