import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Group,
  Anchor,
  Alert,
  Checkbox,
  Paper,
  Title,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconMail,
  IconLock,
  IconUser,
  IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SignUpModal.module.scss";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

interface SignUpModalProps {
  opened: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({
  opened,
  onClose,
  onSwitchToSignIn,
}: SignUpModalProps) => {
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? t('firstNameTooShort') : null,
      lastName: (value) =>
        value.length < 2 ? t('lastNameTooShort') : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('invalidEmail')),
      password: (value) =>
        value.length < 6 ? t('passwordTooShort') : null,
      agreeToTerms: (value) =>
        !value ? t('mustAgreeToTerms') : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual registration logic
      console.log("Sign up:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifications.show({
        title: t('signUpSuccessful'),
        message: t('welcomeMessage'),
        color: "green",
        icon: <IconCheck size={18} />,
      });

      // ✅ Navigate after successful sign up
      navigate("/food/list");

      // For demo purposes, just close the modal
      onClose();
      form.reset();
    } catch {
      setError(t('emailAlreadyExists'));
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
            {t('joinUsToday')}
          </Title>
          <Text size="sm" className={styles.subtitle}>
            {t('createAccount')}
          </Text>
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

              <Group grow>
                <TextInput
                  label={t('firstName')}
                  placeholder={t('enterFirstName')}
                  required
                  leftSection={<IconUser size={18} />}
                  {...form.getInputProps("firstName")}
                  classNames={{
                    label: styles.inputLabel,
                    input: styles.input,
                    section: styles.inputSection,
                  }}
                />
                <TextInput
                  label={t('lastName')}
                  placeholder={t('enterLastName')}
                  required
                  leftSection={<IconUser size={18} />}
                  {...form.getInputProps("lastName")}
                  classNames={{
                    label: styles.inputLabel,
                    input: styles.input,
                    section: styles.inputSection,
                  }}
                />
              </Group>

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
                placeholder={t('createPassword')}
                required
                leftSection={<IconLock size={18} />}
                {...form.getInputProps("password")}
                classNames={{
                  label: styles.inputLabel,
                  input: styles.input,
                  section: styles.inputSection,
                }}
              />

              <Checkbox
                label={
                  <Text size="sm" c="dimmed">
                    {t('agreeToTerms')}{" "}
                    <Anchor
                      href="#"
                      size="sm"
                      c="#ff6b35"
                      style={{ textDecoration: "none" }}
                    >
                      {t('termsOfService')}
                    </Anchor>{" "}
                    {t('and')}{" "}
                    <Anchor
                      href="#"
                      size="sm"
                      c="#ff6b35"
                      style={{ textDecoration: "none" }}
                    >
                      {t('privacyPolicy')}
                    </Anchor>
                  </Text>
                }
                {...form.getInputProps("agreeToTerms", { type: "checkbox" })}
                classNames={{
                  label: styles.checkboxLabel,
                  input: styles.checkboxInput,
                }}
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isLoading}
                className={styles.submitButton}
              >
                {t('createAccountButton')}
              </Button>

              <Text size="sm" ta="center" c="dimmed" style={{ marginTop: 8 }}>
                {t('alreadyHaveAccount')}{" "}
                <Anchor
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToSignIn();
                  }}
                  fw={600}
                  c="#ff6b35"
                  className={styles.switchLink}
                >
                  {t('signIn')}
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
};

export default SignUpModal;
