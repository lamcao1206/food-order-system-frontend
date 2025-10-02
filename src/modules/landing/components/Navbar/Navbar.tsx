import { Button, Group, Text, Container, Burger, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import classes from "./Navbar.module.scss";
import AppLogo from "@/assets/png/app-icon.png";
import SignInModal from "../SignInModal";
import SignUpModal from "../SignUpModal";

export function NavbarLanding() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [signInOpened, setSignInOpened] = useState(false);
  const [signUpOpened, setSignUpOpened] = useState(false);

  const handleSignInClick = () => {
    setSignInOpened(true);
    close(); // Close mobile menu if open
  };

  const handleSignUpClick = () => {
    setSignUpOpened(true);
    close(); // Close mobile menu if open
  };

  const handleSwitchToSignUp = () => {
    setSignInOpened(false);
    setSignUpOpened(true);
  };

  const handleSwitchToSignIn = () => {
    setSignUpOpened(false);
    setSignInOpened(true);
  };

  return (
    <>
      <header className={classes.header}>
        <Container size="lg">
          <Group justify="space-between" h="100%">
            <Group>
              <img src={AppLogo} alt="App Logo" className={classes.logo} />
              <Text size="lg" className={classes.brandName}>
                PizzaHub
              </Text>
            </Group>

            <Group visibleFrom="sm" className={classes.desktopButtons}>
              <Button 
                variant="outline" 
                onClick={handleSignInClick}
                className={classes.signInButton}
              >
                Sign In
              </Button>
              <Button 
                onClick={handleSignUpClick}
                className={classes.signUpButton}
              >
                Sign Up
              </Button>
            </Group>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              className={classes.burger}
            />
          </Group>
        </Container>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        size="sm"
        styles={{
          title: {
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#2c3e50",
          },
        }}
      >
        <Stack gap="md" mt="xl">
          <Button 
            variant="outline" 
            fullWidth
            size="md"
            onClick={handleSignInClick}
            className={classes.mobileSignInButton}
          >
            Sign In
          </Button>
          <Button 
            fullWidth
            size="md"
            onClick={handleSignUpClick}
            className={classes.mobileSignUpButton}
          >
            Sign Up
          </Button>
        </Stack>
      </Drawer>

      {/* Sign In Modal */}
      <SignInModal
        opened={signInOpened}
        onClose={() => setSignInOpened(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        opened={signUpOpened}
        onClose={() => setSignUpOpened(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </>
  );
}
