import { Box, Group, Text } from "@mantine/core";
import { OrderItemsList } from "../OrderItemsList";
import { OrderSummary } from "../OrderSummary";
import classes from "./OrderDetail.module.scss";
import type { CartItemInput } from "@/interfaces/food.interface";
import useCartStore from "@/lib/zustand/stores/useCartStore";
import type { IFoodState } from "@/lib/zustand/slices/cartSlice";

const OrderDetail = () => {
  const cartItems: CartItemInput[] = useCartStore(
    (state: IFoodState) => state.cart
  );
  return (
    <Box className={classes.orderDetail}>
      {cartItems.length > 0 ? (
        <>
          <OrderItemsList />
          <OrderSummary />
        </>
      ) : (
        <Group
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 700 }}>
            Your Order Detail
          </Text>
        </Group>
      )}
    </Box>
  );
};

export default OrderDetail;
