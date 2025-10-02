import {
  Container,
  Grid,
  Text,
  Stack,
  Group,
  Anchor,
  Divider,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container size="lg">
        <Grid gutter="xl">
          {/* Company Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text className={styles.logo}>Pizza Hub</Text>
              <Text className={styles.description}>
                Bringing authentic Italian pizza to your doorstep. Fresh ingredients, 
                traditional recipes, and exceptional taste in every bite.
              </Text>
              <Group gap="md" className={styles.socialLinks}>
                <Anchor href="#" className={styles.socialLink}>
                  <IconBrandFacebook size={20} />
                </Anchor>
                <Anchor href="#" className={styles.socialLink}>
                  <IconBrandInstagram size={20} />
                </Anchor>
                <Anchor href="#" className={styles.socialLink}>
                  <IconBrandTwitter size={20} />
                </Anchor>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
            <Stack gap="md">
              <Text className={styles.sectionTitle}>Quick Links</Text>
              <Stack gap="xs">
                <Anchor href="#" className={styles.footerLink}>
                  Home
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Menu
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  About Us
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Contact
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Order Online
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Customer Service */}
          <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
            <Stack gap="md">
              <Text className={styles.sectionTitle}>Customer Service</Text>
              <Stack gap="xs">
                <Anchor href="#" className={styles.footerLink}>
                  FAQ
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Delivery Info
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Returns
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Privacy Policy
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  Terms of Service
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text className={styles.sectionTitle}>Contact Info</Text>
              <Stack gap="md">
                <Group gap="md" align="flex-start">
                  <IconMapPin size={20} className={styles.contactIcon} />
                  <Text className={styles.contactText}>
                    123 Pizza Street<br />
                    Food City, FC 12345
                  </Text>
                </Group>
                <Group gap="md" align="flex-start">
                  <IconPhone size={20} className={styles.contactIcon} />
                  <Text className={styles.contactText}>
                    (555) 123-PIZZA<br />
                    (555) 123-4567
                  </Text>
                </Group>
                <Group gap="md" align="flex-start">
                  <IconMail size={20} className={styles.contactIcon} />
                  <Text className={styles.contactText}>
                    info@pizzahub.com<br />
                    orders@pizzahub.com
                  </Text>
                </Group>
                <Group gap="md" align="flex-start">
                  <IconClock size={20} className={styles.contactIcon} />
                  <Text className={styles.contactText}>
                    Mon-Sun: 11:00 AM - 11:00 PM<br />
                    Delivery: 12:00 PM - 10:00 PM
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider className={styles.divider} />

        <div className={styles.bottomSection}>
          <Text className={styles.copyright}>
            © 2025 Pizza Hub. All rights reserved.
          </Text>
          <Text className={styles.madeWith}>
            Made with ❤️ for pizza lovers
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
