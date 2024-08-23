import { useRoutes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import Create from "./dashboard/create/Create";
import Auth from "./auth/Auth";

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: <Home />,
    },
    {
      path: "/auth/*",
      element: <Auth />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "create",
          element: <Create />,
        },
      ],
    },
  ]);
};

export default RouteController;
