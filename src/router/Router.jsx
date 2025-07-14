import { createBrowserRouter } from "react-router";
import MainLayouts from "../MainLayout/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Pages/Authentication/AuthLayout";
import SignIn from "../Pages/Authentication/SignIn";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/Dashboard/Myparcel/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyParcels from "../Pages/Dashboard/Myparcel/MyParcels";
import UserProfle from "../Pages/Dashboard/UserProfile/UserProfle";
import DetailsParcel from "../Pages/Dashboard/Myparcel/DetailsParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import ActiveRidersTable from "../Pages/BeARider/RiderStatus/ActiveRidersTable";
import PendingRidersTable from "../Pages/BeARider/RiderStatus/PendingRidersTable";
import Users from "../Pages/Dashboard/UserProfile/users/Users";
import PrivateAdminRoute from "./PrivateAdminRoute";
import AssignRider from "../Pages/BeARider/AssignRider/AssignRider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <UserProfle />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/my-parcels",
        element: (
          <PrivateRoute>
            <MyParcels />
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcels/view/:id",
        element: (
          <PrivateRoute>
            <DetailsParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcels/pay/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <PrivateAdminRoute>
            <AssignRider />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateAdminRoute>
            <Users />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "active-riders",
        element: (
          <PrivateAdminRoute>
            <ActiveRidersTable />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "pending-riders",
        element: (
          <PrivateAdminRoute>
            <PendingRidersTable />
          </PrivateAdminRoute>
        ),
      },
    ],
  },
]);
