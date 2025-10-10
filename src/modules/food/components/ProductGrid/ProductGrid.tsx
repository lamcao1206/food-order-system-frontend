import { Box, Stack,Text,Grid } from "@mantine/core";
import classes from "./ProductGrid.module.scss";
import { ProductCard } from "../ProductCard";
import PizzaSausage from '@/assets/jpg/PizzaSausage.jpg';
import PizzaVegan from '@/assets/jpg/PizzaVegan.jpg';
import PizzaSeaFood from '@/assets/jpg/PizzaSeaFood.jpg';
const pizzaProducts = [
  {
    id: 1,
    name: "Seafood Green Pepper Pizza",
    description: "Fresh seafood topped with green peppers, mozzarella cheese, and a tangy tomato sauce for a delightful burst of flavors.",
    type: [
      { size: 9, price: 230 },
      { size: 12, price: 280 },
    ],
    image: PizzaSeaFood,
  },
  {
    id: 2,
    name: "Seafood Mayonnaise Pizza",
    description: "A creamy combination of seafood, mayonnaise sauce, and melted cheese, creating a rich and savory taste experience.",
    type: [
      { size: 9, price: 240 },
      { size: 12, price: 290 },
    ],
    image: PizzaSeaFood,
  },
  {
    id: 3,
    name: "Seafood Pesto Lemon Cream Pizza",
    description: "Zesty seafood paired with fresh pesto and a hint of lemon cream, offering a refreshing and aromatic pizza delight.",
    type: [
      { size: 9, price: 250 },
      { size: 12, price: 300 },
    ],
    image: PizzaVegan,
  },
  {
    id: 4,
    name: "Beef Cheese Burst Pizza",
    description: "Juicy beef, extra melted cheese, and a blend of herbs on a crispy crust for a rich and hearty pizza experience.",
    type: [
      { size: 9, price: 260 },
      { size: 12, price: 310 },
    ],
    image: PizzaSausage,
  },
  {
    id: 5,
    name: "BBQ Chicken Supreme Pizza",
    description: "Tender BBQ chicken, fresh vegetables, and premium cheese, drizzled with BBQ sauce for a smoky and satisfying flavor.",
    type: [
      { size: 9, price: 270 },
      { size: 12, price: 320 },
    ],
    image: PizzaVegan,
  },
  {
    id: 6,
    name: "Veggie Delight Pizza",
    description: "A colorful mix of fresh vegetables, tomato sauce, and melted cheese, delivering a light yet flavorful vegetarian option.",
    type: [
      { size: 9, price: 220 },
      { size: 12, price: 270 },
    ],
    image: PizzaVegan,
  },
  {
    id: 7,
    name: "Hawaiian Pineapple Pizza",
    description: "Classic ham and juicy pineapple on a cheesy crust, balancing sweet and savory flavors perfectly for a tropical twist.",
    type: [
      { size: 9, price: 245 },
      { size: 12, price: 295 },
    ],
    image: PizzaSausage,
  },
  {
    id: 8,
    name: "Four Cheese Extravaganza Pizza",
    description: "A decadent blend of four cheeses melted to perfection, creating a creamy, rich, and indulgent pizza experience.",
    type: [
      { size: 9, price: 255 },
      { size: 12, price: 305 },
    ],
    image: PizzaSausage,
  },
];


const ProductGrid = () => {
  return (
    <Stack gap="xl">
      <Box>
        <Text
          size="xl"
          fw={700}
          tt="uppercase"
          mb="md"
          style={{ color: "#343a40" }}
        >
          Siêu Topping
        </Text>
        <Grid gutter="xl" className={classes.productGrid}>
          {pizzaProducts.map((product, index) => (
            <Grid.Col key={index} span={{ base: 6, sm: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default ProductGrid;
