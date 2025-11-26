import { Card, Text, Group, Divider, Badge, Rating } from "@mantine/core";
import { useTranslation } from "react-i18next";
import classes from "./OrderHistory.module.scss";
import { OrderStatus } from "@/constants/food";
import useOrderHistoryState from "@/lib/zustand/stores/orderHistoryStore";
import { notifications } from "@mantine/notifications";

export default function OrderHistory() {
  const { t } = useTranslation("food");

  const orders = useOrderHistoryState((state) => state.orders);
  const { updateRating } = useOrderHistoryState(
    (state) => state.actions
  );

  return (
    <div className={classes.history_container}>
      {orders.map((order, index) => {
        console.log("ORDER", order);
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
                🧾 {t("orderHistory.order")} #{index + 1}
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
                  {order.status === OrderStatus.COMPLETED
                    ? t("orderHistory.completed")
                    : order.status === OrderStatus.PENDING
                    ? t("orderHistory.pending")
                    : t("orderHistory.canceled")}
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
                        {t("orderItems.size")}: {item.size}
                      </Text>
                    )}
                    {item.additionalCheese && (
                      <Text size="sm" c="dimmed">
                        {t("orderItems.cheese")}: {item.additionalCheese}
                      </Text>
                    )}
                    {item.additionalCrust && (
                      <Text size="sm" c="dimmed">
                        {t("orderItems.crust")}: {item.additionalCrust}
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
                <Text>{t("orderHistory.dishes")}:</Text>
                <Text>{itemsTotal.toLocaleString()}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text>{t("orderHistory.discount")}:</Text>
                <Text>-{discount.toLocaleString()}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text>{t("orderHistory.voucher")}:</Text>
                <Text>-{voucher.toLocaleString()}đ</Text>
              </Group>

              <Group justify="space-between">
                <Text>{t("orderHistory.deliveryFee")}:</Text>
                <Text>{deliveryFee.toLocaleString()}đ</Text>
              </Group>

              <Divider my="sm" />

              <Group justify="space-between">
                <Text fw={700} fz="lg">
                  {t("orderHistory.total")}:
                </Text>
                <Text fw={700} fz="lg" c="green">
                  {finalTotal.toLocaleString()}đ
                </Text>
              </Group>
            </div>
            {order.status === OrderStatus.COMPLETED && (
              <div className={classes.ratingSection}>
                <span className={classes.ratingLabel}>
                  {t("orderHistory.rateOrder")}:
                </span>
                <Rating
                  value={order.rating || 0}
                  onChange={(value) => {
                    updateRating(index, value || 0);
                    notifications.show({
                      title: t("success.title"),
                      message: t("orderHistory.successRating"),
                      color: "green",
                    });
                  }}
                  size="lg"
                  readOnly={!!order.rating}
                />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
