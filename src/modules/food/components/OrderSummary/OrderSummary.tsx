import { Box, Stack, Group, Text, Divider, Button } from "@mantine/core";
import classes from "./OrderSummary.module.scss";
import useCartStore from "@/lib/zustand/stores/useCartStore";
import type { IFoodState } from "@/lib/zustand/slices/cartSlice";
import type { CartItemInput } from "@/interfaces/food.interface";

const OrderSummary = () => {
  const cartItems: CartItemInput[] = useCartStore(
    (state: IFoodState) => state.cart
  );
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <Box>
      <Stack gap="md">
        <Stack gap={4} pt="md">
          <Group justify="space-between">
            <Text size="sm">Total</Text>
            <Text size="sm">{totalAmount.toLocaleString("vi-VN")}đ</Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Promotion Discount</Text>
            <Text size="sm" style={{ color: "#fa5252" }}>
              0đ
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Vouchers Discount</Text>
            <Text size="sm" style={{ color: "#fa5252" }}>
              0đ
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Delivery Fee</Text>
            <Text size="sm">0đ</Text>
          </Group>
        </Stack>

        <Divider my="sm" />

        <Button fullWidth size="lg" mt="md" className={classes.checkoutButton}>
          {`COMPLETE ORDER  ${totalAmount.toLocaleString("vi-VN")}Đ`}
        </Button>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
