import { Box, Stack, Group, Text, Divider, Button } from "@mantine/core";
import classes from "./OrderSummary.module.scss";
import useCartStore from "@/lib/zustand/stores/useCartStore";
import useOrderStore from "@/lib/zustand/stores/useOrderStore";

import type { IFoodState } from "@/lib/zustand/slices/cartSlice";
import type { CartItemInput } from "@/interfaces/food.interface";
import { notifications } from "@mantine/notifications";
import { discounts } from "@/constants/food";
import type { IOrderState } from "@/lib/zustand/slices/orderSlice";

const OrderSummary = () => {
  const deliveryFee = 16;
  const cartItems: CartItemInput[] = useCartStore(
    (state: IFoodState) => state.cart
  );
  const voucher: number | null |undefined = useCartStore(
    (state: IFoodState) => state.extraVoucher
  );
  const discountId: number | string | null | undefined = useCartStore(
    (state: IFoodState) => state.discount
  );
  const {
    addToCart,
    setDiscount,
    addVoucher,
    setPaymentMethod,
    setAddress,
    setOrderDate,
    setDeliveryFee,
  } = useOrderStore((state: IOrderState) => state.actions);

  const discount = discounts.find((disc) => disc.id === discountId);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let totalAmount = totalPrice;
  let discountValue = !discount
    ? 0
    : typeof discount.value === "number"
    ? discount.value
    : Math.floor(
        (Number(String(discount.value).replace(/[%$]/, "")) * totalAmount) / 100
      );

  if (voucher) {
    totalAmount -= voucher * 1000;
  }
  if (discount) {
    if (discountValue > Number(discount?.maxValue) * 1000)
      discountValue = Number(discount?.maxValue) * 1000;
    totalAmount -= discountValue;
  }
  totalAmount += deliveryFee * 1000;
  const { clearCart, setDiscount: clearDiscount, addVoucher: clearVoucher } = useCartStore((state) => state.actions);

  const onOrderSuccess = () => {
    if (totalAmount > 0)
      notifications.show({
        title: "Success!",
        message: "You have ordered successfully.",
        color: "green",
        position: "top-right",
        autoClose: 4000,
      });
    addToCart(cartItems);
    setDiscount(discountValue ?? null);
    addVoucher(voucher ? voucher*1000 : null);
    setPaymentMethod("Cash on delivery");
    setAddress("ABC X ABC");
    setOrderDate();
    setDeliveryFee(deliveryFee*1000);
    clearCart();
    clearDiscount(null);
    clearVoucher(null);
  };
  return (
    <Box>
      <Stack gap="md">
        <Stack gap={4} pt="md">
          <Group justify="space-between">
            <Text size="sm">Total</Text>
            <Text size="sm">{totalPrice.toLocaleString("vi-VN")}đ</Text>
          </Group>
          <Group justify="space-between" align="flex-start">
            <Text size="sm">Vouchers Discount</Text>
            <Stack gap={0}>
              {voucher && (
                <Text size="sm" style={{ color: "#fa5252" }}>
                  {`-${(voucher * 1000).toLocaleString("vi-VN")}đ`}
                </Text>
              )}
              {discount && (
                <Text size="sm" style={{ color: "#fa5252" }}>
                  {`-${discountValue.toLocaleString("vi-VN")}đ`}
                </Text>
              )}
              {!voucher && !discount && (
                <Text size="sm" style={{ color: "#00000" }}>
                  0đ
                </Text>
              )}
            </Stack>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Delivery Fee</Text>
            <Text size="sm">{`+${(deliveryFee * 1000).toLocaleString(
              "vi-VN"
            )}đ`}</Text>
          </Group>
        </Stack>

        <Divider my="sm" />

        <Button
          fullWidth
          size="lg"
          mt="md"
          className={classes.checkoutButton}
          onClick={() => onOrderSuccess()}
        >
          {`COMPLETE ORDER  ${totalAmount.toLocaleString("vi-VN")}Đ`}
        </Button>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
