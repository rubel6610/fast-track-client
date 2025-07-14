import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4">
      <FaLock className="text-6xl text-red-500 mb-4" />
      <h2 className="text-3xl font-bold text-red-600 mb-2">Unauthorized Access</h2>
      <p className="text-center text-gray-600 mb-6">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
