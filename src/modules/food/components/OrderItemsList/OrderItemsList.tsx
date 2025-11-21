import {
  Stack,
  Group,
  Text,
  TextInput,
  Button,
  ScrollArea,
  Radio,
  Modal,
} from "@mantine/core";
import { IconCircleDot, IconGift, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./OrderItemsList.module.scss";
import type { CartItemInput } from "@/interfaces/food.interface";
import useCartStore from "@/lib/zustand/stores/useCartStore";
import type { IFoodState } from "@/lib/zustand/slices/cartSlice";
import { IconPizza } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { discounts, vouchers } from "@/constants/food";
import usePointDiscountStore from "@/lib/zustand/stores/usePointDiscountStore";

const OrderItemsList = () => {
  const { t } = useTranslation('food');
  const [code, setCode] = useState("");
  const cartItems: CartItemInput[] = useCartStore(
    (state: IFoodState) => state.cart
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const exchangeDiscounts = usePointDiscountStore((state) => state.discounts);
  const applyPointDiscount = usePointDiscountStore((state) => state.actions.useDiscount);


  const extendedVouchers = {
    ...vouchers,
    ...exchangeDiscounts.reduce((acc, d) => {
      if (!d.used) acc[d.code] = d.discountPercent;
      return acc;
    }, {} as Record<string, number>)
  };
  

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleApplyDiscount = () => {
    if (!selectedDiscount) return;

    const discountObj = discounts.find((d) => d.name === selectedDiscount);
    if (!discountObj) return;

    if (totalAmount < discountObj.available) {
      notifications.show({
        title: t('orderItems.cannotApplyDiscount'),
        message: `${t('orderItems.orderMustExceed')} ${(
          discountObj.available * 1000
        ).toLocaleString("vi-VN")}đ`,
        color: "red",
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setDiscount(discountObj.id);
    notifications.show({
      title: t('orderItems.discountApplied'),
      message: `${t('orderItems.youHaveApplied')} ${discountObj.value} ${t('orderItems.discount')}`,
      color: "green",
      position: "top-right",
      autoClose: 3000,
    });
    setModalOpen(false);
  };
  const { removeFromCart, setDiscount } = useCartStore(
    (state: IFoodState) => state.actions
  );

  const onRemoveFromCart = (index: number) => {
    removeFromCart(index);
  };

  const addVoucher = useCartStore((state) => state.actions.addVoucher);

  const handleApply = () => {
    console.log("🚀 ~ handleApply ~ code:", code)
    const voucherValue = extendedVouchers[code.toUpperCase()];
    console.log("🚀 ~ handleApply ~ voucherValue:", voucherValue)
    if (voucherValue) {
      const result = addVoucher(voucherValue);
      console.log("🚀 ~ handleApply ~ result:", result)
      if (exchangeDiscounts.some(d => d.code === code.toUpperCase())) {
        applyPointDiscount(code.toUpperCase());
      }
      if (result)
        notifications.show({
          title: t('orderItems.applySuccessful'),
          message: t('orderItems.youHaveUsedVouchers'),
          color: "green",
          position: "top-right",
          autoClose: 3000,
        });
      else
        notifications.show({
          title: t('orderItems.applyFailed'),
          message: t('orderItems.youHaveUsedVouchersBefore'),
          color: "red",
          position: "top-right",
          autoClose: 3000,
        });
      setCode("");
    } else {
      notifications.show({
          title: t('orderItems.invalidVoucher'),
          message: t('orderItems.voucherExpired'),
          color: "red",
          position: "top-right",
          autoClose: 3000,
        });
    }
  };

  return (
    <Stack>
      <Group
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text className={classes.summaryTitle}>{t('orderDetail.title')}</Text>
        <Text size="md">{cartItems.length} {cartItems.length === 1 ? t('orderDetail.dish') : t('orderDetail.dishes')}</Text>
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
          placeholder={t('orderItems.enterVoucherCode')}
          style={{ flexGrow: 1 }}
          value={code}
          styles={{ input: { border: "none", paddingLeft: "5px" } }}
          onChange={(e) => setCode(e.currentTarget.value)}
        />
        <Button
          size="xs"
          style={{ backgroundColor: "#007bff" }}
          onClick={handleApply}
        >
          {t('orderItems.apply')}
        </Button>
      </Group>
      <Stack>
        <ScrollArea
          style={{
            height: "300px",
            flexGrow: 1,
          }}
          scrollbarSize={0}
          type="auto"
        >
          {cartItems.map((cartItem, index) => {
            const totalAmount = cartItem.price;
            return (
              <Stack key={cartItem.id} gap={4} style={{ marginBottom: "8px" }}>
                <Group align="stretch" gap="sm">
                  <Group align="center">
                    <Group style={{ gap: "4px" }}>
                      <Text fw={600} size="sm">
                        {cartItem.quantity}
                      </Text>
                    </Group>

                    <Text>x</Text>
                  </Group>

                  <Stack
                    gap={4}
                    justify="center"
                    style={{ flexGrow: 1, width: "180px" }}
                  >
                    <Text className={classes.summaryItemName}>
                      {cartItem.name}
                    </Text>
                    <Stack gap={2}>
                      {cartItem.base && (
                        <Text size="xs" c="dimmed">
                          {cartItem.base}
                        </Text>
                      )}
                      {cartItem.size && (
                        <Text size="xs" c="dimmed">
                          {cartItem.size} {t('orderItems.inch')}
                        </Text>
                      )}

                      {cartItem.additionalCheese && (
                        <Text size="xs" c="dimmed">
                          {t('orderItems.cheese')}: {cartItem.additionalCheese}
                        </Text>
                      )}
                      {cartItem.additionalCrust && (
                        <Text size="xs" c="dimmed">
                          {t('orderItems.crust')}: {cartItem.additionalCrust}
                        </Text>
                      )}
                    </Stack>
                  </Stack>

                  <Stack justify="space-between">
                    <Text className={classes.summaryItemPrice}>
                      {totalAmount.toLocaleString("vi-VN")}đ
                    </Text>
                    <Group>
                      <IconPizza
                        style={{ width: "30px", borderRadius: "4px" }}
                      />
                      <IconTrash
                        className={classes.trashIcon}
                        onClick={() => onRemoveFromCart(cartItem.id)}
                      />
                    </Group>
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
          onClick={() => setModalOpen(true)}
        >
          <IconGift size={16} color="#e53935" />
          <Text size="sm" fw={600} style={{ color: "#e53935", flexGrow: 1 }}>
            {t('orderItems.promotionDiscount')}
          </Text>
          <IconCircleDot size={16} color="#e53935" />
        </Group>
      </Stack>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('orderItems.selectPromotionDiscount')}
        styles={{
          title: {
            color: "#e53935",
            fontWeight: 700,
            fontSize: "20px",
            padding: "10px",
          },
        }}
        centered
      >
        <Radio.Group
          value={selectedDiscount}
          onChange={setSelectedDiscount}
          name="discount"
          style={{
            border: "1px solid #e9ecef",
            borderRadius: 8,
            padding: "12px",
            backgroundColor: "#f8f9fa",
            marginBottom: 24,
          }}
        >
          <Stack gap="sm">
            {discounts.map((d) => (
              <Stack
                key={d.name}
                gap={2}
                style={{
                  padding: "8px",
                  borderRadius: 6,
                  backgroundColor:
                    totalAmount < d.available * 1000 ? "#f1f3f5" : "#ffffff",
                  border:
                    totalAmount < d.available * 1000
                      ? "1px solid #dee2e6"
                      : "1px solid #ced4da",
                }}
              >
                <Radio
                  value={d.name}
                  label={`${d.name}: ${d.value}`}
                  disabled={totalAmount < d.available * 1000}
                  styles={{
                    label: {
                      fontWeight: 600,
                      color:
                        totalAmount < d.available * 1000
                          ? "#868e96"
                          : "#212529",
                    },
                    root: {
                      marginBottom: 4,
                    },
                  }}
                />
                <Text
                  size="xs"
                  color={totalAmount < d.available * 1000 ? "dimmed" : "black"}
                >
                  {`${d.description}, but not exceeded ${(
                    d.maxValue * 1000
                  ).toLocaleString("vi-VN")}đ`}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Radio.Group>

        <Button
          fullWidth
          style={{ marginTop: 16 }}
          onClick={handleApplyDiscount}
          disabled={!selectedDiscount}
        >
          {t('orderItems.applyDiscount')}
        </Button>
      </Modal>
    </Stack>
  );
};

export default OrderItemsList;
