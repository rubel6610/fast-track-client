import { createBrowserRouter } from "react-router";
import MainLayouts from "../MainLayout/MainLayouts";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        Component:MainLayouts,
        children:[
            {
                index:true,
                Component:Home,
            },
        ]
    }
])