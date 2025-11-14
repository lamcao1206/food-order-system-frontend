import { OrderHistory } from "@/modules/food/components/OrderHistory/index";
import { NavbarLanding } from "@/modules/landing/components/Navbar/Navbar";
import { Stack } from "@mantine/core";

const OrderHistoryPage = () => {
  return (
    <Stack>
      <NavbarLanding />
      <OrderHistory />
    </Stack>
  );
};

export default OrderHistoryPage;
