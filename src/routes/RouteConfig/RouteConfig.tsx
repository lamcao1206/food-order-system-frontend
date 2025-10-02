import { RouteId } from "@/constants/route";
import type { RouteObject } from "react-router-dom";
import AuthRoute from "../AuthRoute/AuthRoute";
import { LandingPage } from "@/modules/landing/screens/LandingPage";

type RouteType = RouteObject & { authCanAccess?: boolean };

const publicRoute: RouteType = {
  id: RouteId.PUBLIC,
  path: "/",
  element: <LandingPage />,
};

const authRoute: RouteType = {
  id: RouteId.AUTH,
  element: <AuthRoute />,
  children: [
    {
      path: "/home",
      element: <p>Home</p>,
    },
  ],
};

const routes: RouteType[] = [
  {
    id: RouteId.PUBLIC_ROOT,
    path: "/",
    children: [publicRoute],
  },
];

export default routes;
