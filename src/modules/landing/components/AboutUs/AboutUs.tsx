import {
  Container,
  Title,
  Text,
  Grid,
  Stack,
  Card,
} from "@mantine/core";
import {
  IconChefHat,
  IconLeaf,
  IconHeart,
  IconAward,
} from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import styles from "./AboutUs.module.scss";
import pizzaImage from "../../../../assets/png/pizza.png";

const AboutUs = () => {
  const { t } = useTranslation('landing');
  return (
    <div className={styles.section}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Title order={2} className={styles.title}>
                {t('aboutUs.title')}
              </Title>
              <Text size="lg" className={styles.subtitle}>
                {t('aboutUs.subtitle')}
              </Text>
              <Text className={styles.description}>
                {t('aboutUs.story1')}
              </Text>
              <Text className={styles.description}>
                {t('aboutUs.story2')}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={styles.imageContainer}>
              <img
                src={pizzaImage}
                alt="Delicious Pizza"
                className={styles.pizzaImage}
              />
            </div>
          </Grid.Col>
        </Grid>

        <div className={styles.valuesSection}>
          <Title order={3} className={styles.valuesTitle} ta="center">
            {t('aboutUs.valuesTitle')}
          </Title>

          <Grid gutter="xl" className={styles.valuesGrid}>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card className={styles.valueCard} shadow="sm" radius="lg">
                <Stack align="center" gap="md">
                  <div className={styles.valueIcon}>
                    <IconChefHat size={32} />
                  </div>
                  <Title order={4} className={styles.valueTitle}>
                    {t('aboutUs.masterChefs.title')}
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    {t('aboutUs.masterChefs.description')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card className={styles.valueCard} shadow="sm" radius="lg">
                <Stack align="center" gap="md">
                  <div className={styles.valueIcon}>
                    <IconLeaf size={32} />
                  </div>
                  <Title order={4} className={styles.valueTitle}>
                    {t('aboutUs.freshIngredients.title')}
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    {t('aboutUs.freshIngredients.description')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card className={styles.valueCard} shadow="sm" radius="lg">
                <Stack align="center" gap="md">
                  <div className={styles.valueIcon}>
                    <IconHeart size={32} />
                  </div>
                  <Title order={4} className={styles.valueTitle}>
                    {t('aboutUs.madeWithLove.title')}
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    {t('aboutUs.madeWithLove.description')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card className={styles.valueCard} shadow="sm" radius="lg">
                <Stack align="center" gap="md">
                  <div className={styles.valueIcon}>
                    <IconAward size={32} />
                  </div>
                  <Title order={4} className={styles.valueTitle}>
                    {t('aboutUs.awardWinning.title')}
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    {t('aboutUs.awardWinning.description')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
