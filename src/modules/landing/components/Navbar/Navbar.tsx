import {
  Button,
  Group,
  Text,
  Container,
  Burger,
  Drawer,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.scss";
import AppLogo from "@/assets/png/app-icon.png";
import SignInModal from "../SignInModal";
import SignUpModal from "../SignUpModal";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import useUserStore from "@/lib/zustand/stores/useUserStore";

export function NavbarLanding() {
  const { t } = useTranslation(["landing", "auth"]);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.actions.clearUser);
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

  const handleSignOut = () => {
    clearUser();
    navigate("/");
    close();
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
            {user && user.role === 'normal' && (
              <Group visibleFrom="sm" className={classes.navLinks}>
                <Link to="/food/list">{t("landing:navbar.menu")}</Link>
                <Link to="/food/order">{t("landing:navbar.order")}</Link>
                <Link to="/food/history">{t("landing:navbar.history")}</Link>
                <Link to="/food/account">{t("landing:navbar.account")}</Link>
                <Link to="/food/point-discount">{t("landing:navbar.pointDiscount")}</Link>
              </Group>
            )}
            <Group visibleFrom="sm" className={classes.desktopButtons}>
              <LanguageSwitcher />
              {user ? (
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className={classes.signInButton}
                >
                  {t("auth:signOut")}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleSignInClick}
                    className={classes.signInButton}
                  >
                    {t("landing:navbar.signIn")}
                  </Button>
                  <Button
                    onClick={handleSignUpClick}
                    className={classes.signUpButton}
                  >
                    {t("landing:navbar.signUp")}
                  </Button>
                </>
              )}
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
        title={t("landing:navbar.mobileMenu")}
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
          <Group justify="center">
            <LanguageSwitcher />
          </Group>
          {user && user.role === 'normal' && (
            <Stack gap="xs" w="100%">
              <Link to="/food/list" onClick={close} style={{ textDecoration: 'none' }}>
                <Button variant="subtle" fullWidth size="md" className={classes.mobileNavLink}>
                  {t("landing:navbar.menu")}
                </Button>
              </Link>
              <Link to="/food/order" onClick={close} style={{ textDecoration: 'none' }}>
                <Button variant="subtle" fullWidth size="md" className={classes.mobileNavLink}>
                  {t("landing:navbar.order")}
                </Button>
              </Link>
              <Link to="/food/history" onClick={close} style={{ textDecoration: 'none' }}>
                <Button variant="subtle" fullWidth size="md" className={classes.mobileNavLink}>
                  {t("landing:navbar.history")}
                </Button>
              </Link>
              <Link to="/food/account" onClick={close} style={{ textDecoration: 'none' }}>
                <Button variant="subtle" fullWidth size="md" className={classes.mobileNavLink}>
                  {t("landing:navbar.account")}
                </Button>
              </Link>
              <Link to="/food/point-discount" onClick={close} style={{ textDecoration: 'none' }}>
                <Button variant="subtle" fullWidth size="md" className={classes.mobileNavLink}>
                  {t("landing:navbar.pointDiscount")}
                </Button>
              </Link>
            </Stack>
          )}
          {user ? (
            <Button
              variant="outline"
              fullWidth
              size="md"
              onClick={handleSignOut}
              className={classes.mobileSignInButton}
            >
              {t("auth:signOut")}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                fullWidth
                size="md"
                onClick={handleSignInClick}
                className={classes.mobileSignInButton}
              >
                {t("landing:navbar.signIn")}
              </Button>
              <Button
                fullWidth
                size="md"
                onClick={handleSignUpClick}
                className={classes.mobileSignUpButton}
              >
                {t("landing:navbar.signUp")}
              </Button>
            </>
          )}
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
