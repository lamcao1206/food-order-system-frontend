import { Container, Title, Text, Card, Group, Badge, Button, Stack, Grid } from '@mantine/core';
import { IconStar, IconShoppingCart, IconClock } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import styles from './FeaturedPizzas.module.scss';

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  cookTime: number;
  image: string;
  isPopular?: boolean;
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: 'Margherita Classic',
    description: 'Fresh tomato sauce, mozzarella, basil, and extra virgin olive oil',
    price: 18.99,
    rating: 4.8,
    cookTime: 15,
    image: '🍕',
    isPopular: true
  },
  {
    id: 2,
    name: 'Pepperoni Supreme',
    description: 'Spicy pepperoni, mozzarella, and our signature tomato sauce',
    price: 22.99,
    rating: 4.9,
    cookTime: 18,
    image: '🍕'
  },
  {
    id: 3,
    name: 'Quattro Stagioni',
    description: 'Artichokes, mushrooms, ham, olives, and mozzarella',
    price: 24.99,
    rating: 4.7,
    cookTime: 20,
    image: '🍕'
  },
  {
    id: 4,
    name: 'BBQ Chicken Deluxe',
    description: 'Grilled chicken, BBQ sauce, red onions, and mozzarella',
    price: 21.99,
    rating: 4.6,
    cookTime: 17,
    image: '🍕'
  }
];

const FeaturedPizzas = () => {
  const { t } = useTranslation('landing');
  
  return (
    <div className={styles.section}>
      <Container size="lg">
        <Stack gap="xl" align="center" className={styles.header}>
          <Title order={2} className={styles.title}>
            {t('featuredPizzas.title')}
          </Title>
          <Text size="lg" className={styles.subtitle} ta="center" maw={600}>
            {t('featuredPizzas.subtitle')}
          </Text>
        </Stack>

        <Grid gutter="xl" className={styles.pizzaGrid}>
          {pizzas.map((pizza) => (
            <Grid.Col key={pizza.id} span={{ base: 12, sm: 6, md: 3 }}>
              <Card className={styles.pizzaCard} shadow="md" radius="lg">
                {pizza.isPopular && (
                  <Badge className={styles.popularBadge} size="lg">
                    {t('featuredPizzas.popular')}
                  </Badge>
                )}
                
                <div className={styles.pizzaImage}>
                  <Text size="md">{pizza.image}</Text>
                </div>

                <Stack gap="sm" className={styles.cardContent}>
                  <Title order={4} className={styles.pizzaName}>
                    {pizza.name}
                  </Title>
                  
                  <Text size="sm" className={styles.pizzaDescription}>
                    {pizza.description}
                  </Text>

                  <Group justify="space-between" className={styles.pizzaInfo}>
                    <Group gap="xs">
                      <IconStar size={16} className={styles.starIcon} />
                      <Text size="sm" fw={500}>
                        {pizza.rating}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconClock size={16} />
                      <Text size="sm">
                        {pizza.cookTime} {t('featuredPizzas.min')}
                      </Text>
                    </Group>
                  </Group>

                  <Group justify="space-between" className={styles.priceGroup}>
                    <Text size="xl" fw={700} className={styles.price}>
                      ${pizza.price}
                    </Text>
                    <Button 
                      size="sm" 
                      className={styles.orderButton}
                      leftSection={<IconShoppingCart size={16} />}
                    >
                      {t('featuredPizzas.order')}
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <div className={styles.viewAllSection}>
          <Button size="lg" variant="outline" className={styles.viewAllButton}>
            {t('featuredPizzas.viewFullMenu')}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedPizzas;
