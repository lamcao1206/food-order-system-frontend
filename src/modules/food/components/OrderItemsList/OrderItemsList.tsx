import {
  Stack,
  Group,
  Text,
  TextInput,
  Button,
  ScrollArea,
} from "@mantine/core";
import { IconCircleDot, IconGift } from "@tabler/icons-react";
import classes from "./OrderItemsList.module.scss";
import type { CartItemInput } from "@/interfaces/food.interface";
import useCartStore from "@/lib/zustand/stores/useCartStore";
import type { IFoodState } from "@/lib/zustand/slices/cartSlice";
import { IconPizza } from "@tabler/icons-react";
const OrderItemsList = () => {
  const cartItems: CartItemInput[] = useCartStore(
    (state: IFoodState) => state.cart
  );
  return (
    <Stack>
      <Group
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text className={classes.summaryTitle}>Your Order Detail</Text>
        <Text size="md">{cartItems.length} Dishes</Text>
      </Group>

      <Group
        gap="xs"
        style={{
          border: "1px solid #e9ecef",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        <TextInput
          placeholder="Enter E-voucher code"
          style={{ flexGrow: 1 }}
          styles={{ input: { border: "none", paddingLeft: "5px" } }}
        />
        <Button size="xs" style={{ backgroundColor: "#007bff" }}>
          Apply
        </Button>
      </Group>
      <Stack>
        <ScrollArea
          style={{
            height: "320px",
            flexGrow: 1,
          }}
          scrollbarSize={0}
          type="auto"
        >
          {cartItems.map((cartItem, index) => {
            const totalAmount = cartItem.price * cartItem.quantity;
            return (
              <Stack key={cartItem.id} gap={4} style={{ marginBottom: "8px" }}>
                <Group align="stretch" gap="sm">
                  <Group align="center">
                    <Text fw={600} size="sm">
                      {cartItem.quantity}
                    </Text>
                    <Text>x</Text>
                  </Group>

                  <Stack
                    gap={4}
                    justify="space-between"
                    style={{ flexGrow: 1, width: "180px" }}
                  >
                    <Text className={classes.summaryItemName}>
                      {cartItem.name}
                    </Text>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        {cartItem.base}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {cartItem.size} inch
                      </Text>
                      {cartItem.additionalCheese ? (
                        <Text size="xs" c="dimmed">
                          {cartItem.additionalCheese}
                        </Text>
                      ) : (
                        <></>
                      )}
                      {cartItem.additionalCrust ? (
                        <Text size="xs" c="dimmed">
                          {cartItem.additionalCrust}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Stack>

                  <Stack justify="space-between">
                    <Text className={classes.summaryItemPrice}>
                      {totalAmount.toLocaleString("vi-VN")}đ
                    </Text>
                    <IconPizza style={{ width: "40px", borderRadius: "4px" }}/>

                  </Stack>
                </Group>
                {index < cartItems.length - 1 && (
                  <div
                    style={{
                      borderBottom: "1px solid #e9ecef",
                      width: "100%",
                    }}
                  />
                )}
              </Stack>
            );
          })}
        </ScrollArea>

        <Group
          gap="xs"
          style={{
            backgroundColor: "#fff0f6",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #fcc2d7",
            cursor: "pointer",
          }}
        >
          <IconGift size={16} color="#e53935" />
          <Text size="sm" fw={600} style={{ color: "#e53935", flexGrow: 1 }}>
            Purchase on Promotion
          </Text>
          <IconCircleDot size={16} color="#e53935" />
        </Group>
      </Stack>
    </Stack>
  );
};

export default OrderItemsList;
