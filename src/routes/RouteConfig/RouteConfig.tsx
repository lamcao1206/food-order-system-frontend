import { RouteId } from "@/constants/route";
import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { LandingPage } from "@/modules/landing/screens/LandingPage";
import {FoodList} from "@/modules/food/screens/FoodList";
import {OrderCheckOutPage} from "@/modules/food/screens/OrderCheckOut";
import { OrderHistoryPage } from "@/modules/food/screens/OrderHistory";
import { Account } from "@/modules/food/screens/Account";
import { PointDiscountExchange } from "@/modules/food/screens/PointDiscountExchange";
import { RestaurantOrderList } from "@/modules/restaurant/screens/RestaurantOrderList";
type RouteType = RouteObject & { authCanAccess?: boolean };

const publicRoute: RouteType = {
  id: RouteId.PUBLIC,
  path: "/",
  element: <LandingPage />,
};

const foodRoute: RouteType = {
  id: RouteId.FOOD,
  path: "list",
  element: <FoodList />
}

const orderRoute: RouteType = {
  id: RouteId.ORDER,
  path: "order",
  element: <OrderCheckOutPage />,
};

const historyRoute: RouteType = {
  id: RouteId.HISTORY,
  path: "history",
  element: <OrderHistoryPage />,
};

const accountRoute: RouteType = {
  id: RouteId.ACCOUNT,
  path: "account",
  element: <Account />,
};

const pointDiscountRoute: RouteType = {
  id: RouteId.POINT_DISCOUNT,
  path: "point-discount",
  element: <PointDiscountExchange />,
};

const restaurantRoute: RouteType = {
  id: RouteId.RESTAURANT,
  path: "orders",
  element: <RestaurantOrderList />,
};

const routes: RouteType[] = [
  {
    id: RouteId.PUBLIC_ROOT,
    path: "/",
    children: [publicRoute],
  },
  {
    id: RouteId.PRIVATE_ROOT,
    path: "/food",
    element: <ProtectedRoute allowedRole="normal" />,
    children: [foodRoute,orderRoute,historyRoute,accountRoute,pointDiscountRoute]
  },
  {
    id: RouteId.RESTAURANT_ROOT,
    path: "/restaurant",
    element: <ProtectedRoute allowedRole="restaurant" />,
    children: [restaurantRoute]
  },
];

export default routes;
