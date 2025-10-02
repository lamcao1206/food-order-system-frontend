import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { IconChefHat, IconClock, IconMapPin } from '@tabler/icons-react';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <Container size="lg" className={styles.container}>
        <Stack gap="xl" align="center" className={styles.content}>
          <div className={styles.badge}>
            <IconChefHat size={24} />
            <Text size="sm" fw={600}>Authentic Italian Pizza</Text>
          </div>
          
          <Title order={1} className={styles.title}>
            Welcome to{' '}
            <span className={styles.highlight}>Pizza Hub</span>
          </Title>
          
          <Text size="xl" className={styles.subtitle} ta="center" maw={600}>
            Experience the perfect blend of traditional Italian recipes and modern flavors. 
            Fresh ingredients, hand-tossed dough, and authentic taste in every bite.
          </Text>
          
          <Group gap="md" className={styles.ctaGroup}>
            <Button size="lg" className={styles.primaryButton}>
              Order Now
            </Button>
            <Button size="lg" variant="outline" className={styles.secondaryButton}>
              View Menu
            </Button>
          </Group>
          
          <Group gap="xl" className={styles.features}>
            <div className={styles.feature}>
              <IconClock size={32} className={styles.featureIcon} />
              <Text size="sm" fw={500}>30 Min Delivery</Text>
            </div>
            <div className={styles.feature}>
              <IconMapPin size={32} className={styles.featureIcon} />
              <Text size="sm" fw={500}>Free Delivery</Text>
            </div>
            <div className={styles.feature}>
              <IconChefHat size={32} className={styles.featureIcon} />
              <Text size="sm" fw={500}>Fresh Made</Text>
            </div>
          </Group>
        </Stack>
      </Container>
    </div>
  );
};

export default HeroSection;
