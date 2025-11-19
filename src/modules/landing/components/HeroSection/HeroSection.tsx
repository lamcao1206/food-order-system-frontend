import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { IconChefHat, IconClock, IconMapPin } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const { t } = useTranslation('landing');
  return (
    <div className={styles.heroSection}>
      <Container size="lg" className={styles.container}>
        <Stack gap="xl" align="center" className={styles.content}>
          <div className={styles.badge}>
            <IconChefHat size={24} />
            <Text size="sm" fw={600}>{t('hero.authenticItalianPizza')}</Text>
          </div>
          
          <Title order={1} className={styles.title}>
            {t('hero.welcomeTo')}{' '}
            <span className={styles.highlight}>{t('hero.pizzaHub')}</span>
          </Title>
          
          <Text size="xl" className={styles.subtitle} ta="center" maw={600}>
            {t('hero.subtitle')}
          </Text>
          
          <Group gap="md" className={styles.ctaGroup}>
            <Button size="lg" className={styles.primaryButton}>
              {t('hero.orderNow')}
            </Button>
            <Button size="lg" variant="outline" className={styles.secondaryButton}>
              {t('hero.viewMenu')}
            </Button>
          </Group>
          
          <Group gap="xl" className={styles.features}>
            <div className={styles.feature}>
              <IconClock size={32} className={styles.featureIcon} />
              <Text size="sm" fw={500}>{t('hero.minDelivery')}</Text>
            </div>
            <div className={styles.feature}>
              <IconMapPin size={32} className={styles.featureIcon} />
              <Text size="sm" fw={500}>{t('hero.freeDelivery')}</Text>
            </div>
            <div className={styles.feature}>
              <IconChefHat size={32} className={styles.featureIcon} />
              <Text size="sm" fw={500}>{t('hero.freshMade')}</Text>
            </div>
          </Group>
        </Stack>
      </Container>
    </div>
  );
};

export default HeroSection;
