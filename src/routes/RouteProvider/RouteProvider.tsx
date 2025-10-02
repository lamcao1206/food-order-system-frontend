import { RouterProvider as BaseRouteProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "../RouteConfig";

const router = createBrowserRouter(routes);

const RouterProvider = () => {
  return <BaseRouteProvider router={router} />
}

export default RouterProvider;