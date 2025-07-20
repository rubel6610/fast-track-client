import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Components/Loading';
import Unauthorized from '../Pages/Unauthorized/UnAuthorized';
import UseUserRole from '../Hooks/UseUserRole';

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseUserRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Unauthorized />;
};

export default PrivateAdminRoute;
