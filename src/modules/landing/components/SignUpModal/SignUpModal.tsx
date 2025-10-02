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
import { IconAlertCircle, IconMail, IconLock, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import styles from "./SignUpModal.module.scss";

interface SignUpModalProps {
  opened: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({ opened, onClose, onSwitchToSignIn }: SignUpModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
    validate: {
      firstName: (value) => (value.length < 2 ? "First name must be at least 2 characters" : null),
      lastName: (value) => (value.length < 2 ? "Last name must be at least 2 characters" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password must be at least 6 characters" : null),
      agreeToTerms: (value) => (!value ? "You must agree to the terms and conditions" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError("");
    
    try {
      // TODO: Implement actual registration logic
      console.log("Sign up:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just close the modal
      onClose();
      form.reset();
    } catch (err) {
      setError("Email already exists or registration failed");
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
            Join Us Today
          </Title>
          <Text size="sm" className={styles.subtitle}>
            Create your account to get started
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

              <Group grow>
                <TextInput
                  label="First Name"
                  placeholder="Enter your first name"
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
                  label="Last Name"
                  placeholder="Enter your last name"
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
                placeholder="Create a password"
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
                    I agree to the{" "}
                    <Anchor href="#" size="sm" c="#ff6b35" style={{ textDecoration: "none" }}>
                      Terms of Service
                    </Anchor>{" "}
                    and{" "}
                    <Anchor href="#" size="sm" c="#ff6b35" style={{ textDecoration: "none" }}>
                      Privacy Policy
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
                Create Account
              </Button>

              <Text size="sm" ta="center" c="dimmed" style={{ marginTop: 8 }}>
                Already have an account?{" "}
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
                  Sign in
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
