import {
  Container,
  Paper,
  Stack,
  Title,
  Text,
  Button,
  Group,
  Card,
  Badge,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { IconGift, IconCopy, IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import useUserStore from "@/lib/zustand/stores/useUserStore";
import usePointDiscountStore from "@/lib/zustand/stores/usePointDiscountStore";
import { NavbarLanding } from "@/modules/landing/components/Navbar/Navbar";
import classes from "./PointDiscountExchange.module.scss";

// Generate a random 6-character code (uppercase letters only)
const generateDiscountCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const PointDiscountExchange = () => {
  const { t } = useTranslation('food');
  const user = useUserStore((state) => state.user);
  const { addLoyaltyPoints } = useUserStore((state) => state.actions);
  const discounts = usePointDiscountStore((state) => state.discounts);
  const { addDiscount } = usePointDiscountStore((state) => state.actions);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const POINTS_PER_DISCOUNT = 100;
  const DISCOUNT_PERCENT = 10;

  const availableDiscounts = discounts.filter((d) => !d.used);
  const userPoints = user?.loyaltyPoints ?? 0;
  const canExchange = userPoints >= POINTS_PER_DISCOUNT;

  const handleExchange = () => {
    if (!user) {
      notifications.show({
        title: t('pointDiscount.error'),
        message: t('pointDiscount.notLoggedIn'),
        color: 'red',
      });
      return;
    }

    if (!canExchange) {
      notifications.show({
        title: t('pointDiscount.error'),
        message: t('pointDiscount.insufficientPoints'),
        color: 'red',
      });
      return;
    }

    // Generate unique code
    let code = generateDiscountCode();
    // Ensure code is unique
    while (discounts.some((d) => d.code === code)) {
      code = generateDiscountCode();
    }

    // Add discount
    addDiscount(code);

    // Deduct points
    addLoyaltyPoints(-POINTS_PER_DISCOUNT);

    notifications.show({
      title: t('pointDiscount.success'),
      message: t('pointDiscount.exchangeSuccess'),
      color: 'green',
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    notifications.show({
      title: t('pointDiscount.copied'),
      message: t('pointDiscount.codeCopied'),
      color: 'blue',
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <NavbarLanding />
      <Container size="md" className={classes.container}>
        <Paper shadow="sm" p="xl" radius="md" className={classes.paper}>
          <Stack gap="xl">
            <Title order={2} className={classes.title}>
              {t('pointDiscount.title')}
            </Title>

            <Card withBorder p="lg" radius="md" className={classes.infoCard}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="lg" fw={500}>
                    {t('pointDiscount.yourPoints')}
                  </Text>
                  <Badge size="lg" color="blue" variant="light">
                    {userPoints} {t('account.points')}
                  </Badge>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    {t('pointDiscount.exchangeRate')}
                  </Text>
                  <Text size="sm" fw={500}>
                    {POINTS_PER_DISCOUNT} {t('account.points')} = {DISCOUNT_PERCENT}% {t('pointDiscount.discount')}
                  </Text>
                </Group>
              </Stack>
            </Card>

            <Button
              size="lg"
              leftSection={<IconGift size={20} />}
              onClick={handleExchange}
              disabled={!canExchange}
              className={classes.exchangeButton}
            >
              {t('pointDiscount.exchangeButton')}
            </Button>

            {!canExchange && (
              <Text size="sm" c="red" ta="center">
                {t('pointDiscount.needMorePoints', { points: POINTS_PER_DISCOUNT - userPoints })}
              </Text>
            )}

            <Divider label={t('pointDiscount.yourDiscounts')} labelPosition="center" />

            {availableDiscounts.length === 0 ? (
              <Card withBorder p="lg" radius="md" className={classes.emptyCard}>
                <Text ta="center" c="dimmed">
                  {t('pointDiscount.noDiscounts')}
                </Text>
              </Card>
            ) : (
              <ScrollArea h={400}>
                <Stack gap="md">
                  {availableDiscounts.map((discount) => (
                    <Card
                      key={discount.code}
                      withBorder
                      p="md"
                      radius="md"
                      className={classes.discountCard}
                    >
                      <Group justify="space-between" align="center">
                        <Stack gap="xs">
                          <Group gap="xs">
                            <Text fw={600} size="lg">
                              {discount.code}
                            </Text>
                            <Badge color="green" variant="light">
                              {discount.discountPercent}% {t('pointDiscount.off')}
                            </Badge>
                          </Group>
                          <Text size="xs" c="dimmed">
                            {t('pointDiscount.created')}: {formatDate(discount.createdAt)}
                          </Text>
                        </Stack>
                        <Button
                          variant="light"
                          size="sm"
                          leftSection={
                            copiedCode === discount.code ? (
                              <IconCheck size={16} />
                            ) : (
                              <IconCopy size={16} />
                            )
                          }
                          onClick={() => handleCopyCode(discount.code)}
                        >
                          {copiedCode === discount.code
                            ? t('pointDiscount.copied')
                            : t('pointDiscount.copy')}
                        </Button>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            )}

            {discounts.filter((d) => d.used).length > 0 && (
              <>
                <Divider label={t('pointDiscount.usedDiscounts')} labelPosition="center" />
                <ScrollArea h={200}>
                  <Stack gap="md">
                    {discounts
                      .filter((d) => d.used)
                      .map((discount) => (
                        <Card
                          key={discount.code}
                          withBorder
                          p="md"
                          radius="md"
                          className={classes.usedDiscountCard}
                        >
                          <Group justify="space-between">
                            <Group gap="xs">
                              <Text fw={600} c="dimmed">
                                {discount.code}
                              </Text>
                              <Badge color="gray" variant="light">
                                {t('pointDiscount.used')}
                              </Badge>
                            </Group>
                            <Text size="xs" c="dimmed">
                              {formatDate(discount.createdAt)}
                            </Text>
                          </Group>
                        </Card>
                      ))}
                  </Stack>
                </ScrollArea>
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default PointDiscountExchange;

