import { createBrowserRouter } from "react-router";
import MainLayouts from "../MainLayout/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Pages/Authentication/AuthLayout";
import SignIn from "../Pages/Authentication/SignIn";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "./../Pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyParcels from "../Pages/Dashboard/Myparcel/MyParcels";
import UserProfle from "../Pages/Dashboard/UserProfile/UserProfle";
import DetailsParcel from "../Pages/Dashboard/Myparcel/DetailsParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";

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
        path:"/dashboard",
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children:[
            {
              path:"profile",
              element:<UserProfle/>
            },
            {
              path:"payment-history",
              element:<PaymentHistory/>
            },
            {
              path:"/dashboard/my-parcels",
              element:<PrivateRoute><MyParcels/></PrivateRoute>,
            
            },
            {
              path:"my-parcels/view/:id",
              element:<PrivateRoute><DetailsParcel/></PrivateRoute>,
              
            },
            {
              path:"my-parcels/pay/:id",
              element:<PrivateRoute><Payment/></PrivateRoute>,
              
            },
        ]
      }
]);
