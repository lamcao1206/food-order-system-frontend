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
import { useTranslation } from 'react-i18next';
import styles from "./Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation('landing');
  return (
    <footer className={styles.footer}>
      <Container size="lg">
        <Grid gutter="xl">
          {/* Company Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text className={styles.logo}>Pizza Hub</Text>
              <Text className={styles.description}>
                {t('footer.description')}
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
              <Text className={styles.sectionTitle}>{t('footer.quickLinks')}</Text>
              <Stack gap="xs">
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.home')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.menu')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.aboutUs')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.contact')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.orderOnline')}
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Customer Service */}
          <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
            <Stack gap="md">
              <Text className={styles.sectionTitle}>{t('footer.customerService')}</Text>
              <Stack gap="xs">
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.faq')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.deliveryInfo')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.returns')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.privacyPolicy')}
                </Anchor>
                <Anchor href="#" className={styles.footerLink}>
                  {t('footer.termsOfService')}
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text className={styles.sectionTitle}>{t('footer.contactInfo')}</Text>
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
            {t('footer.copyright')}
          </Text>
          <Text className={styles.madeWith}>
            {t('footer.madeWith')}
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
