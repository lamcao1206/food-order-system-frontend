import { RouteId } from "@/constants/route";
import type { RouteObject } from "react-router-dom";
import AuthRoute from "../AuthRoute/AuthRoute";
import { LandingPage } from "@/modules/landing/screens/LandingPage";
import {FoodList} from "@/modules/food/screens/FoodList";

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

const foodRoute: RouteType = {
  id: RouteId.FOOD,
  path: "list",
  element: <FoodList />
}

const routes: RouteType[] = [
  {
    id: RouteId.PUBLIC_ROOT,
    path: "/",
    children: [publicRoute],
  },
  {
    id: RouteId.PRIVATE_ROOT,
    path: "/food",
    children: [foodRoute]
  }
];

export default routes;
