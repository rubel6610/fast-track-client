import React, { useState } from "react";
import { NavLink } from "react-router"; // fixed import
import { FaBars, FaTimes } from "react-icons/fa";
import Loading from "../../Components/Loading";
import UseUserRole from "../../Hooks/UseUserRole";

const DashboardAside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) return <Loading />;

  return (
    <>
      {/* Top Bar with Bars button (only on mobile) */}
      <div className="md:hidden p-4 border-b flex items-center">
        <button
          aria-label="Open sidebar"
          className="btn btn-outline btn-success"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-bold ml-4">Dashboard</h1>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-green-600 text-white space-y-4 h-full w-64 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            aria-label="Close sidebar"
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
            <NavLink
              to="my-parcels"
              className={({ isActive }) =>
                isActive ? "bg-amber-500 px-4 py-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="payment-history"
              className={({ isActive }) =>
                isActive ? "bg-amber-500 px-4 py-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Payment History
            </NavLink>
          </li>
          {/* rider dashboard */}
          {!roleLoading && role === "rider" && (
            <>
              <li>
                <NavLink
                  to="pending-deliveries"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="completed-deliveries"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Completed Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="my-earnings"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  My Earnings
                </NavLink>
              </li>
            </>
          )}
          {/* admin dashboard */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="active-riders"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="pending-riders"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="assign-riders"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Assign Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    isActive ? "bg-amber-500 px-4 py-2" : ""
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Users
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "bg-amber-500 px-4 py-2" : ""
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default DashboardAside;
