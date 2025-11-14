import { Card, Text, Group, Divider, Badge } from "@mantine/core";
import classes from "./OrderHistory.module.scss";
import { OrderStatus } from "@/constants/food";
import useOrderStore from "@/lib/zustand/stores/useOrderStore";
import { useEffect, useState } from "react";

const ordersHistory = [
  {
    orderDate: "14:30:00 13/11/2025",
    deliveryFee: 15000,
    discount: 10000,
    extraVoucher: 5000,
    paymentMethod: "Cash on delivery",
    address: "123 Nguyễn Văn Cừ, Quận 5",
    cart: [
      {
        id: 1,
        name: "Honey Glazed Chicken",
        price: 170000,
        quantity: 1,
      },
    ],
    status: OrderStatus.COMPLETED,
  },
  {
    orderDate: "10:30:00 7/11/2025",
    deliveryFee: 20000,
    discount: 0,
    extraVoucher: 10000,
    paymentMethod: "Cash on delivery",
    address: "55 Trần Hưng Đạo, Quận 1",
    cart: [
      {
        id: 3,
        name: "Spaghetti Carbonara",
        price: 180000,
        quantity: 1,
      },
      {
        id: 4,
        name: "Teriyaki Chicken",
        price: 180000,
        quantity: 1,
      },
    ],
    status: OrderStatus.COMPLETED,
  },
  {
    orderDate: "8:00:00 6/11/2025",
    deliveryFee: 15000,
    discount: 20000,
    extraVoucher: 0,
    paymentMethod: "Cash on delivery",
    address: "456 Lê Lợi, Quận 3",
    cart: [
      {
        id: 5,
        name: "Stuffed Mushrooms",
        price: 110000,
        quantity: 2,
      },
      {
        id: 6,
        name: "Crispy Fried Chicke",
        price: 150000,
        quantity: 1,
      },
    ],
    status: OrderStatus.COMPLETED,
  },
];
export default function OrderHistory() {
  const currentCart = useOrderStore((state) => state.cart ?? []);
  const orderDate = useOrderStore((state) => state.orderDate);
  const deliveryFee = useOrderStore((state) => state.deliveryFee);
  const discount = useOrderStore((state) => state.discount);
  const extraVoucher = useOrderStore((state) => state.extraVoucher);
  const paymentMethod = useOrderStore((state) => state.paymentMethod);
  const address = useOrderStore((state) => state.address);

  const [orders, setOrders] = useState(ordersHistory);

  useEffect(() => {
    if (currentCart?.length === 0) return;

    const newOrder = {
      orderDate: orderDate,
      deliveryFee: deliveryFee ?? 0,
      discount: discount ?? 0,
      extraVoucher: extraVoucher ?? 0,
      paymentMethod: paymentMethod ?? "Cash on delivery",
      address: address ?? "",
      cart: currentCart,
      status: OrderStatus.PENDING,
    };

    setOrders((prev) => {
      const lastOrder = prev[0];
      if (JSON.stringify(lastOrder.cart) === JSON.stringify(currentCart)) {
        return prev;
      }
      return [newOrder, ...prev];
    });
  }, [
    currentCart,
    orderDate,
    deliveryFee,
    discount,
    extraVoucher,
    paymentMethod,
    address,
  ]);

  return (
    <div className={classes.history_container}>
      {orders.map((order, index) => {
        const itemsTotal = order.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const discount = order.discount ?? 0;
        const voucher = order.extraVoucher ?? 0;
        const deliveryFee = order.deliveryFee ?? 0;

        const finalTotal = itemsTotal - discount - voucher + deliveryFee;

        return (
          <Card
            key={index}
            shadow="sm"
            className={classes.order_card}
            withBorder
          >
            <Group justify="space-between">
              <Text fw={700} fz="lg">
                🧾 Order #{index + 1}
              </Text>
              <Group>
                <span
                  className={`${classes.statusBadge} ${
                    order.status === OrderStatus.COMPLETED
                      ? classes.statusCompleted
                      : order.status === OrderStatus.PENDING
                      ? classes.statusPending
                      : classes.statusCanceled
                  }`}
                >
                  {order.status?.toUpperCase()}
                </span>
                <Badge color="blue">{order.orderDate}</Badge>
              </Group>
            </Group>

            <Divider my="sm" />

            {/* CART ITEMS */}
            <div className={classes.cart_items}>
              {order.cart.map((item) => (
                <div key={item.id} className={classes.cart_item}>
                  <div>
                    <Text fw={600}>{item.name}</Text>
                    <Text size="sm" c="dimmed">
                      {item.quantity} × {item.price.toLocaleString()}đ
                    </Text>

                    {item.size && (
                      <Text size="sm" c="dimmed">
                        Size: {item.size}
                      </Text>
                    )}
                    {item.additionalCheese && (
                      <Text size="sm" c="dimmed">
                        Cheese: {item.additionalCheese}
                      </Text>
                    )}
                    {item.additionalCrust && (
                      <Text size="sm" c="dimmed">
                        Crust: {item.additionalCrust}
                      </Text>
                    )}
                  </div>

                  <Text fw={500}>
                    {(item.price * item.quantity).toLocaleString()}đ
                  </Text>
                </div>
              ))}
            </div>

            <Divider my="sm" />

            {/* TOTAL */}
            <div className={classes.order_summary}>
              <Group justify="space-between">
                <Text>Dishes:</Text>
                <Text>{itemsTotal.toLocaleString()}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text>Discount:</Text>
                <Text>-{discount.toLocaleString()}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text>Voucher:</Text>
                <Text>-{voucher.toLocaleString()}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text>Delivery fee:</Text>
                <Text>{deliveryFee.toLocaleString()}đ</Text>
              </Group>

              <Divider my="sm" />

              <Group justify="space-between">
                <Text fw={700} fz="lg">
                  Total:
                </Text>
                <Text fw={700} fz="lg" c="green">
                  {finalTotal.toLocaleString()}đ
                </Text>
              </Group>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
