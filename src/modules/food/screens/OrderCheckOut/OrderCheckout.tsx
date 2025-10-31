import { OrderCheckOut } from "@/modules/food/components/OrderCheckout/index";
import { NavbarLanding } from "@/modules/landing/components/Navbar/Navbar";
import { Stack } from "@mantine/core";

const OrderCheckOutPage = () => {
  return (
    <Stack>
      <NavbarLanding />
      <OrderCheckOut />
    </Stack>
  );
};

export default OrderCheckOutPage;
