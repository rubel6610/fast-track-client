import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <div className="urbanist-font ">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    
    </AuthProvider>
  </div>
);
