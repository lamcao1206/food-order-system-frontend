import { Box, Stack, Text, Grid } from "@mantine/core";
import classes from "./ProductGrid.module.scss";
import { ProductCard } from "../ProductCard";
import PizzaSausage from "@/assets/jpg/PizzaSausage.jpg";
import PizzaVegan from "@/assets/jpg/PizzaVegan.jpg";
import PizzaSeaFood from "@/assets/jpg/PizzaSeaFood.jpg";
import Pasta1 from "@/assets/jpg/Pasta1.jpg";
import Pasta2 from "@/assets/png/Pasta2.png";
import Pasta3 from "@/assets/jpg/Pasta3.jpg";
import Pasta4 from "@/assets/jpg/Pasta4.jpeg";
import Chicken1 from "@/assets/png/Chicken1.png";
import Chicken2 from "@/assets/jpg/Chicken2.jpg";
import Chicken3 from "@/assets/jpg/Chicken3.jpg";
import Chicken4 from "@/assets/jpg/Chicken4.jpeg";
import Bruschetta from "@/assets/jpg/Bruschettas.jpeg";
import ChickenWing from "@/assets/jpg/ChickenWing.jpg";
import GarlicBread from "@/assets/jpg/GarlicBread.jpeg";
import OnionRings from "@/assets/jpg/OnionRings.jpeg";
import StuffedMushroom from "@/assets/jpg/StuffedMushroom.jpeg";
import mozzarella from "@/assets/jpg/mozzarella.jpg";

import { FoodCategory } from "@/constants/food";
const foodProducts = [
  {
    id: 25,
    name: "BBQ Chicken Drumsticks",
    description:
      "Juicy drumsticks smothered in smoky BBQ sauce and grilled to perfection.",
    type: { price: 175 },
    image: Chicken1,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 13,
    name: "Onion Rings",
    description:
      "Crispy battered onion rings, golden fried and served with dipping sauce.",
    type: { price: 100 },
    image: OnionRings,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 14,
    name: "Chicken Wings",
    description:
      "Juicy chicken wings tossed in a savory sauce, served with celery sticks.",
    type: { price: 130 },
    image: ChickenWing,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 1,
    name: "Seafood Green Pepper Pizza",
    description:
      "Fresh seafood topped with green peppers, mozzarella cheese, and a tangy tomato sauce for a delightful burst of flavors.",
    type: [
      { size: 9, price: 230 },
      { size: 12, price: 280 },
    ],
    image: PizzaSeaFood,
    category: FoodCategory.PIZZA,
  },
  {
    id: 2,
    name: "Seafood Mayonnaise Pizza",
    description:
      "A creamy combination of seafood, mayonnaise sauce, and melted cheese, creating a rich and savory taste experience.",
    type: [
      { size: 9, price: 240 },
      { size: 12, price: 290 },
    ],
    image: PizzaSeaFood,
    category: FoodCategory.PIZZA,
  },
  {
    id: 5,
    name: "BBQ Chicken Supreme Pizza",
    description:
      "Tender BBQ chicken, fresh vegetables, and premium cheese, drizzled with BBQ sauce for a smoky and satisfying flavor.",
    type: [
      { size: 9, price: 270 },
      { size: 12, price: 320 },
    ],
    image: PizzaVegan,
    category: FoodCategory.PIZZA,
  },
  {
    id: 10,
    name: "Mozzarella Cheese Sticks",
    description:
      "Deep-fried mozzarella sticks served with tangy marinara sauce for the ultimate cheesy indulgence.",
    type: { price: 120 },
    image: mozzarella,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 6,
    name: "Veggie Delight Pizza",
    description:
      "A colorful mix of fresh vegetables, tomato sauce, and melted cheese, delivering a light yet flavorful vegetarian option.",
    type: [
      { size: 9, price: 220 },
      { size: 12, price: 270 },
    ],
    image: PizzaVegan,
    category: FoodCategory.PIZZA,
  },
  {
    id: 15,
    name: "Spaghetti Carbonara",
    description:
      "Classic Italian pasta tossed with creamy egg sauce, crispy bacon, and grated parmesan cheese.",
    type: { price: 180 },
    image: Pasta1,
    category: FoodCategory.PASTA,
  },
  {
    id: 7,
    name: "Hawaiian Pineapple Pizza",
    description:
      "Classic ham and juicy pineapple on a cheesy crust, balancing sweet and savory flavors perfectly for a tropical twist.",
    type: [
      { size: 9, price: 245 },
      { size: 12, price: 295 },
    ],
    image: PizzaSausage,
    category: FoodCategory.PIZZA,
  },
  {
    id: 9,
    name: "Garlic Bread",
    description:
      "Crispy golden bread slices topped with garlic butter and parsley — the perfect appetizer to start your meal.",
    type: { price: 90 },
    image: GarlicBread,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 23,
    name: "Honey Glazed Chicken",
    description:
      "Grilled chicken with a sweet and sticky honey glaze, juicy and flavorful.",
    type: { price: 170 },
    image: Chicken3,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 26,
    name: "Teriyaki Chicken",
    description:
      "Tender chicken glazed with sweet and savory teriyaki sauce, served with sesame seeds.",
    type: { price: 180 },
    image: Chicken3,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 11,
    name: "Bruschetta",
    description:
      "Grilled bread rubbed with garlic and topped with fresh tomatoes, basil, and olive oil.",
    type: { price: 95 },
    image: Bruschetta,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 12,
    name: "Stuffed Mushrooms",
    description:
      "Mushrooms filled with cheese, herbs, and breadcrumbs, baked to perfection.",
    type: { price: 110 },
    image: StuffedMushroom,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 3,
    name: "Seafood Pesto Lemon Cream Pizza",
    description:
      "Zesty seafood paired with fresh pesto and a hint of lemon cream, offering a refreshing and aromatic pizza delight.",
    type: [
      { size: 9, price: 250 },
      { size: 12, price: 300 },
    ],
    image: PizzaVegan,
    category: FoodCategory.PIZZA,
  },
  {
    id: 21,
    name: "Crispy Fried Chicken",
    description:
      "Golden-fried chicken seasoned to perfection, crispy on the outside and juicy inside.",
    type: { price: 150 },
    image: Chicken1,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 22,
    name: "Spicy Grilled Chicken",
    description:
      "Tender chicken marinated in spicy herbs and grilled to smoky perfection, served with dipping sauce.",
    type: { price: 165 },
    image: Chicken2,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 4,
    name: "Beef Cheese Burst Pizza",
    description:
      "Juicy beef, extra melted cheese, and a blend of herbs on a crispy crust for a rich and hearty pizza experience.",
    type: [
      { size: 9, price: 260 },
      { size: 12, price: 310 },
    ],
    image: PizzaSausage,
    category: FoodCategory.PIZZA,
  },
  {
    id: 16,
    name: "Seafood Alfredo Pasta",
    description:
      "Rich and creamy Alfredo sauce with fresh seafood and linguine pasta for a luxurious meal.",
    type: { price: 210 },
    image: Pasta2,
    category: FoodCategory.PASTA,
  },
  {
    id: 17,
    name: "Penne Arrabbiata",
    description:
      "Spicy tomato sauce with garlic, chili, and olive oil, tossed with penne pasta.",
    type: { price: 170 },
    image: Pasta3,
    category: FoodCategory.PASTA,
  },
  {
    id: 18,
    name: "Fettuccine Alfredo",
    description:
      "Creamy Alfredo sauce mixed with fettuccine pasta and a sprinkle of parmesan.",
    type: { price: 200 },
    image: Pasta4,
    category: FoodCategory.PASTA,
  },
  {
    id: 19,
    name: "Bolognese Pasta",
    description:
      "Rich meaty tomato sauce served with spaghetti for a hearty and classic Italian dish.",
    type: { price: 190 },
    image: Pasta2,
    category: FoodCategory.PASTA,
  },
  {
    id: 8,
    name: "Four Cheese Extravaganza Pizza",
    description:
      "A decadent blend of four cheeses melted to perfection, creating a creamy, rich, and indulgent pizza experience.",
    type: [
      { size: 9, price: 255 },
      { size: 12, price: 305 },
    ],
    image: PizzaSausage,
    category: FoodCategory.PIZZA,
  },
  {
    id: 20,
    name: "Pesto Pasta",
    description:
      "Fresh basil pesto sauce mixed with pasta, pine nuts, and parmesan cheese for a fragrant taste.",
    type: { price: 185 },
    image: Pasta4,
    category: FoodCategory.PASTA,
  },
  {
    id: 24,
    name: "Lemon Herb Chicken",
    description:
      "Chicken roasted with fresh herbs and lemon slices for a zesty, aromatic flavor.",
    type: { price: 160 },
    image: Chicken4,
    category: FoodCategory.CHICKEN,
  },
];



interface ProductGridProps {
  category: string;
}

const ProductGrid = ({ category }: ProductGridProps) => {
  let products = [...foodProducts];
  console.log(category);
  if (category) {
    products = products.filter((product) => product.category === category);
  }

  return (
    <Stack gap="xl">
      <Box>
        {category === FoodCategory.PIZZA && (
          <Text
            size="xl"
            fw={700}
            tt="uppercase"
            mb="md"
            style={{ color: "#343a40" }}
          >
            Super Extra Topping
          </Text>
        )}

        <Grid gutter="xl" className={classes.productGrid}>
          {products.map((product, index) => (
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
