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
import styles from "./AboutUs.module.scss";
import pizzaImage from "../../../../assets/png/pizza.png";

const AboutUs = () => {
  return (
    <div className={styles.section}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Title order={2} className={styles.title}>
                Our Story
              </Title>
              <Text size="lg" className={styles.subtitle}>
                Passion for Authentic Italian Pizza
              </Text>
              <Text className={styles.description}>
                Founded in 2025, Pizza Hub began as a small family restaurant
                with a simple mission: to bring authentic Italian pizza to our
                community. Our founder, Marco, learned the art of pizza making
                from his grandmother in Naples, and we've been perfecting our
                craft ever since.
              </Text>
              <Text className={styles.description}>
                Every pizza is handcrafted using traditional techniques, fresh
                ingredients sourced from local farms, and the same passion that
                started our journey. We believe that great pizza brings people
                together and creates lasting memories.
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
            What Makes Us Special
          </Title>

          <Grid gutter="xl" className={styles.valuesGrid}>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card className={styles.valueCard} shadow="sm" radius="lg">
                <Stack align="center" gap="md">
                  <div className={styles.valueIcon}>
                    <IconChefHat size={32} />
                  </div>
                  <Title order={4} className={styles.valueTitle}>
                    Master Chefs
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    Trained in traditional Italian techniques with years of
                    experience
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
                    Fresh Ingredients
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    Sourced daily from local farms and premium suppliers
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
                    Made with Love
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    Every pizza is crafted with passion and attention to detail
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
                    Award Winning
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    className={styles.valueDescription}
                  >
                    Recognized for excellence in taste and service
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
