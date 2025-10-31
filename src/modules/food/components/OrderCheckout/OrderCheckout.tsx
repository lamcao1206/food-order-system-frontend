import {
  Card,
  Stack,
  Group,
  Text,
  Divider,
  ScrollArea,
  Title,
  Paper,
} from "@mantine/core";
import useOrderStore from "@/lib/zustand/stores/useOrderStore";
import NoItemFound from "@/assets/jpg/no_item_found.jpg";
const OrderCheckOut = () => {
  const cart = useOrderStore((state) => state.cart ?? []);
  const discount = useOrderStore((state) => state.discount ?? null);
  const extraVoucher = useOrderStore((state) => state.extraVoucher ?? null);
  const paymentMethod = useOrderStore((state) => state.paymentMethod ?? null);
  const address = useOrderStore((state) => state.address ?? null);
  const orderDate = useOrderStore((state) => state.orderDate ?? null);
  const deliveryFee = useOrderStore((state) => state.deliveryFee ?? null);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountValue = typeof discount === "number" ? discount : 0;
  const voucherValue = extraVoucher ?? 0;
  const deliveryValue = deliveryFee ?? 0;

  const finalAmount = totalAmount - discountValue - voucherValue + deliveryValue;

  const loyaltyPoints = Math.floor(finalAmount / 10000); // ví dụ: 1 điểm / 10.000đ

  return (
    <Stack align="center" mt="lg">
      <Card shadow="sm" radius="md" withBorder style={{ width: "600px" }}>
        <Title order={3} ta="center" c="blue" fw={700}>
          Order Summary
        </Title>

        <Divider my="md" />

        {cart.length > 0 ? (
          <>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={500}>Order Date:</Text>
                <Text c="dimmed">{orderDate || "Not available"}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Payment Method:</Text>
                <Text c="dimmed">{paymentMethod || "Not selected"}</Text>
              </Group>

              <Group justify="space-between" align="flex-start">
                <Text fw={500}>Shipping Address:</Text>
                <Text c="dimmed" style={{ maxWidth: "300px" }}>
                  {address || "No address provided"}
                </Text>
              </Group>
            </Stack>

            <Divider my="md" />

            <Title order={5} fw={600}>
              Order Items
            </Title>
            <ScrollArea h={200} type="auto" offsetScrollbars>
              <Stack gap="xs" mt="xs">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <Group
                      key={item.id}
                      justify="space-between"
                      style={{
                        borderBottom: "1px solid #f1f3f5",
                        paddingBottom: "6px",
                      }}
                    >
                      <Stack gap={2}>
                        <Text fw={500}>{item.name}</Text>
                        <Text size="sm" c="dimmed">
                          Quantity: {item.quantity}
                        </Text>
                      </Stack>
                      <Text fw={500}>
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </Text>
                    </Group>
                  ))
                ) : (
                  <Text c="dimmed" ta="center">
                    No items in order.
                  </Text>
                )}
              </Stack>
            </ScrollArea>

            <Divider my="md" />

            <Stack gap={6}>
              <Group justify="space-between">
                <Text fw={500}>Subtotal:</Text>
                <Text>{totalAmount.toLocaleString("vi-VN")}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Discount:</Text>
                <Text c="red">
                  {discountValue > 0
                    ? `-${discountValue.toLocaleString("vi-VN")}đ`
                    : "0đ"}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Voucher:</Text>
                <Text c="red">
                  {voucherValue > 0
                    ? `-${voucherValue.toLocaleString("vi-VN")}đ`
                    : "0đ"}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text fw={500}>Delivery fee:</Text>
                <Text>
                  {deliveryValue > 0
                    ? `${deliveryValue.toLocaleString("vi-VN")}đ`
                    : "0đ"}
                </Text>
              </Group>

              <Divider />

              <Group justify="space-between">
                <Text fw={700} size="lg">
                  Total:
                </Text>
                <Text fw={700} size="lg" c="blue">
                  {finalAmount.toLocaleString("vi-VN")}đ
                </Text>
              </Group>
            </Stack>

            <Divider my="md" />

            <Paper
              radius="md"
              p="sm"
              style={{
                backgroundColor: "#e7f5ff",
                border: "1px solid #d0ebff",
                textAlign: "center",
              }}
            >
              <Text fw={600}>
                🎉 You’ve earned{" "}
                <Text span c="blue" fw={700}>
                  {loyaltyPoints}
                </Text>{" "}
                points from this order!
              </Text>
            </Paper>
          </>
        ) : (
          <Stack align="center" justify="center">
            <img
              src={NoItemFound}
              alt="No Item Found"
              style={{ width: "60%", height: "60%", objectFit: "cover" }}
            />
            <Text fw={600} style={{fontSize: "24px"}}>
              You have not ordered yet
            </Text>
          </Stack>
        )}
      </Card>
    </Stack>
  );
};

export default OrderCheckOut;
