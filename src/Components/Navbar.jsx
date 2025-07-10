import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import ProfastLogo from "./ProfastLogo";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, SignOutuser } = UseAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    SignOutuser().then(() => {
      Swal.fire({
        title: "Success!",
        text: "Sign out Successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a",
      });
      navigate("/signin");
    });
  };
  const navlinks = (
    <>
      <li>
        <NavLink
          to="services"
          className={({ isActive }) => (isActive ? "primary-color" : "")}
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) => (isActive ? "primary-color" : "")}
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) => (isActive ? "primary-color" : "")}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/send-parcel"
          className={({ isActive }) => (isActive ? "primary-color" : "")}
        >
          Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/be-rider"
          className={({ isActive }) => (isActive ? "primary-color" : "")}
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
        <Link to="/" className="btn btn-ghost text-xl">
          <ProfastLogo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end rounded-2xl gap-4">
        {!user ? (
          <>
            <Link
              to="signin"
              className="btn btn-soft hover:bg-[#ACC857] hover:text-white "
            >
              Sign In
            </Link>
            <a className="btn text-base-300 bg-primary">Be a rider</a>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user"
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
             <li> 
              <h1>{user.displayName}</h1>
           </li>
           <li><Link to="/dashboard/my-parcels">Dashboard</Link></li>
           <li>
            <button
              onClick={handleSignOut}
              className="btn text-base-300 bg-primary"
            >
              Sign out
            </button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
