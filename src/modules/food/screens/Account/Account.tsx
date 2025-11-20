import { Container, Paper, Stack, Title, Text, Avatar, Group, Box } from "@mantine/core";
import { IconMail, IconClock, IconMapPin, IconUser, IconStar } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import useUserStore from "@/lib/zustand/stores/useUserStore";
import { NavbarLanding } from "@/modules/landing/components/Navbar/Navbar";
import classes from "./Account.module.scss";

const Account = () => {
  const { t } = useTranslation('food');
  const user = useUserStore((state) => state.user);

  // Get last login from localStorage
  const getLastLogin = () => {
    const lastLogin = localStorage.getItem(`lastLogin_${user?.id}`);
    if (lastLogin) {
      return new Date(lastLogin).toLocaleString();
    }
    return t('account.never');
  };

  // Get name from user or derive from email
  const getUserName = () => {
    if (user?.name) {
      return user.name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return t('account.user');
  };

  // Get initials for avatar
  const getInitials = () => {
    const name = getUserName();
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
              {t('account.title')}
            </Title>

            <Box className={classes.avatarSection}>
              <Avatar
                size={120}
                radius="50%"
                className={classes.avatar}
                color="red"
              >
                {getInitials()}
              </Avatar>
            </Box>

            <Stack gap="md" className={classes.infoSection}>
              <Group gap="md" className={classes.infoItem}>
                <Box className={classes.iconWrapper}>
                  <IconUser size={20} />
                </Box>
                <Box className={classes.infoContent}>
                  <Text size="sm" c="dimmed" className={classes.label}>
                    {t('account.name')}
                  </Text>
                  <Text size="lg" fw={500} className={classes.value}>
                    {getUserName()}
                  </Text>
                </Box>
              </Group>

              <Group gap="md" className={classes.infoItem}>
                <Box className={classes.iconWrapper}>
                  <IconMail size={20} />
                </Box>
                <Box className={classes.infoContent}>
                  <Text size="sm" c="dimmed" className={classes.label}>
                    {t('account.email')}
                  </Text>
                  <Text size="lg" fw={500} className={classes.value}>
                    {user.email}
                  </Text>
                </Box>
              </Group>

              <Group gap="md" className={classes.infoItem}>
                <Box className={classes.iconWrapper}>
                  <IconClock size={20} />
                </Box>
                <Box className={classes.infoContent}>
                  <Text size="sm" c="dimmed" className={classes.label}>
                    {t('account.lastLogin')}
                  </Text>
                  <Text size="lg" fw={500} className={classes.value}>
                    {getLastLogin()}
                  </Text>
                </Box>
              </Group>

              <Group gap="md" className={classes.infoItem}>
                <Box className={classes.iconWrapper}>
                  <IconMapPin size={20} />
                </Box>
                <Box className={classes.infoContent}>
                  <Text size="sm" c="dimmed" className={classes.label}>
                    {t('account.location')}
                  </Text>
                  <Text size="lg" fw={500} className={classes.value}>
                    {t('account.vietnam')}
                  </Text>
                </Box>
              </Group>

              <Group gap="md" className={classes.infoItem}>
                <Box className={classes.iconWrapper}>
                  <IconStar size={20} />
                </Box>
                <Box className={classes.infoContent}>
                  <Text size="sm" c="dimmed" className={classes.label}>
                    {t('account.loyaltyPoints')}
                  </Text>
                  <Text size="lg" fw={500} className={classes.value}>
                    {user.loyaltyPoints ?? 0} {t('account.points')}
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Account;

