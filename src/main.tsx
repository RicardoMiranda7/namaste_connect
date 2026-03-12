import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, redirect, RouterProvider} from "react-router";
import "./index.css";

import {Layout} from "./components/Layout";
import {Login, loginAction} from "./pages/Login";
import {Dashboard, dashboardLoader} from "./pages/Dashboard";
import {classAction, ClassDetails, classLoader} from "./pages/ClassDetails";
import {api} from "./services/mockApi";
import {ROUTES} from "./constants/routes.ts";

const requireAuth = async () => {
  if (!api.isAuthenticated()) throw redirect(ROUTES.LOGIN);
  return null;
};

const router = createBrowserRouter([
  {
    // no component, just a path
    path: "/namaste_connect",
    children: [
      {
        path: "login",
        element: <Login/>,
        action: loginAction,
      },
      {
        element: <Layout/>,
        loader: requireAuth,
        children: [
          {
            index: true,
            element: <Dashboard/>,
            loader: dashboardLoader,
          },
          {
            path: "class/:id",
            element: <ClassDetails/>,
            loader: classLoader,
            action: classAction,
          },
          {
            path: "attendees",
            element: <div className="p-4">Global Attendees List (Placeholder)</div>,
          }
        ],
      },
    ],
  },

]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
);