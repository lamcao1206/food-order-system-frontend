import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Anchor,
  Alert,
  Paper,
  Title,
  Box,
  SegmentedControl,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconMail,
  IconLock,
  IconCheck,
  IconUser,
  IconBuilding,
} from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
import styles from "./SignInModal.module.scss";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/lib/zustand/stores/useUserStore";
import { RESTAURANT_EMAIL, RESTAURANT_PASSWORD } from "@/modules/restaurant/constants";

interface SignInModalProps {
  opened: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal = ({
  opened,
  onClose,
  onSwitchToSignUp,
}: SignInModalProps) => {
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signInMode, setSignInMode] = useState<'customer' | 'restaurant'>('customer');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.actions.setUser);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('invalidEmail')),
      password: (value) =>
        value.length < 6 ? t('passwordTooShort') : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if restaurant sign in
      if (signInMode === 'restaurant') {
        // Validate restaurant credentials
        if (values.email === RESTAURANT_EMAIL && values.password === RESTAURANT_PASSWORD) {
          // Set user in store
          setUser({
            id: 'restaurant-1',
            email: values.email,
            name: 'Pizza Hut Restaurant',
            role: 'restaurant',
          });

          notifications.show({
            title: t('loginSuccessful'),
            message: t('welcomeBackMessage'),
            color: "green",
            icon: <IconCheck size={18} />,
          });

          // Navigate to restaurant page
          navigate("/restaurant/orders");
          onClose();
          form.reset();
        } else {
          setError(t('invalidEmailOrPassword'));
        }
      } else {
        // Customer sign in (existing logic)
        setUser({
          id: '1',
          email: values.email,
          name: values.email.split('@')[0],
          role: 'normal',
        });

        notifications.show({
          title: t('loginSuccessful'),
          message: t('welcomeBackMessage'),
          color: "green",
          icon: <IconCheck size={18} />,
        });

        // Navigate to food list
        navigate("/food/list");
        onClose();
        form.reset();
      }
    } catch {
      setError(t('invalidEmailOrPassword'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      classNames={{
        content: styles.modalContent,
        body: styles.modalBody,
      }}
    >
      <Paper className={styles.paper}>
        {/* Header */}
        <Box className={styles.header}>
          <Title order={2} className={styles.title}>
            {t('welcomeBack')}
          </Title>
          <Text size="sm" className={styles.subtitle}>
            {signInMode === 'customer' ? t('signInToAccount') : t('signInToRestaurantAccount')}
          </Text>
          
          <SegmentedControl
            value={signInMode}
            onChange={(value) => setSignInMode(value as 'customer' | 'restaurant')}
            data={[
              {
                value: 'customer',
                label: (
                  <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconUser size={16} />
                    <span>{t('customer')}</span>
                  </Box>
                ),
              },
              {
                value: 'restaurant',
                label: (
                  <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconBuilding size={16} />
                    <span>{t('restaurant')}</span>
                  </Box>
                ),
              },
            ]}
            fullWidth
            color="red"
            style={{ marginTop: '16px' }}
          />
        </Box>

        {/* Form Content */}
        <Box className={styles.formContent}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title={t('error')}
                  color="red"
                  variant="light"
                  className={styles.alert}
                >
                  {error}
                </Alert>
              )}

              <TextInput
                label={t('emailAddress')}
                placeholder={t('enterEmail')}
                required
                leftSection={<IconMail size={18} />}
                {...form.getInputProps("email")}
                classNames={{
                  label: styles.inputLabel,
                  input: styles.input,
                  section: styles.inputSection,
                }}
              />

              <PasswordInput
                label={t('password')}
                placeholder={t('enterPassword')}
                required
                leftSection={<IconLock size={18} />}
                {...form.getInputProps("password")}
                classNames={{
                  label: styles.inputLabel,
                  input: styles.input,
                  section: styles.inputSection,
                }}
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isLoading}
                className={styles.submitButton}
              >
                {t('signIn')}
              </Button>

              <Text size="sm" ta="center" c="dimmed" style={{ marginTop: 8 }}>
                {t('dontHaveAccount')}{" "}
                <Anchor
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToSignUp();
                  }}
                  fw={600}
                  c="#ff6b35"
                  className={styles.switchLink}
                >
                  {t('signUp')}
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
};

export default SignInModal;
