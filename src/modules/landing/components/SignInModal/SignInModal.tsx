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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconMail,
  IconLock,
  IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import styles from "./SignInModal.module.scss";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual authentication logic
      console.log("Sign in:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifications.show({
        title: "Login Successful",
        message: "Welcome back!",
        color: "green",
        icon: <IconCheck size={18} />,
      });

      // ✅ Navigate after successful login
      navigate("/food/list");

      // For demo purposes, just close the modal
      onClose();
      form.reset();
    } catch (err) {
      setError("Invalid email or password");
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
            Welcome Back
          </Title>
          <Text size="sm" className={styles.subtitle}>
            Sign in to your account
          </Text>
        </Box>

        {/* Form Content */}
        <Box className={styles.formContent}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Error"
                  color="red"
                  variant="light"
                  className={styles.alert}
                >
                  {error}
                </Alert>
              )}

              <TextInput
                label="Email Address"
                placeholder="Enter your email"
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
                label="Password"
                placeholder="Enter your password"
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
                Sign In
              </Button>

              <Text size="sm" ta="center" c="dimmed" style={{ marginTop: 8 }}>
                Don't have an account?{" "}
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
                  Sign up
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
