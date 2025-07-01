import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router";
import ProfastLogo from "../../Components/ProfastLogo";

const Navbar = () => {
  const navlinks = (
    <>
      <li>
        <NavLink
          to="services"
          className={({ isActive }) => isActive && "primary-color"}
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="Coverage"
          className={({ isActive }) => isActive && "primary-color"}
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="about-us"
          className={({ isActive }) => isActive && "primary-color"}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="pricing"
          className={({ isActive }) => isActive && "bg-primary"}
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="be-rider"
          className={({ isActive }) => isActive && "bg-primary"}
        >
        Be a Rider
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBars />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><ProfastLogo/></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end rounded-2xl gap-4">
        <a className="btn btn-soft hover:bg-[#ACC857] hover:text-white ">Sign In</a>
        <a className="btn text-base-300 bg-primary">Be a rider</a>
      </div>
    </div>
  );
};

export default Navbar;
