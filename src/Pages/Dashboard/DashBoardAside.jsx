import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardAside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Top Bar with Bars button (only on mobile) */}
      <div className="md:hidden p-4 border-b flex items-center">
        <button
          className="btn btn-outline btn-success"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-bold ml-4">Dashboard</h1>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-green-600 text-white  space-y-4 h-full w-64  ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold ">Dashboard</h2>
          <button
            className="btn btn-outline btn-error"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar NavLinks */}
        <ul className="space-y-4 menu w-full">
          <h2 className="text-2xl font-bold hidden md:block">Dashboard</h2>
            <li>
            <NavLink to="my-parcels" className={({isActive})=> isActive && " bg-amber-500 px-4 py-2"} onClick={() => setIsSidebarOpen(false)}>
            My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="payment-history" className={({isActive})=> isActive ? " bg-amber-500 px-4 py-2" :""} onClick={() => setIsSidebarOpen(false)}>
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="rider" className={({isActive})=> isActive ? " bg-amber-500 px-4 py-2" :""} onClick={() => setIsSidebarOpen(false)}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="profile" className={({isActive})=> isActive ? " bg-amber-500 px-4 py-2" :""} onClick={() => setIsSidebarOpen(false)}>
              Profile
            </NavLink>
          </li>
        
        </ul>
      </aside>
    </>
  );
};

export default DashboardAside;
