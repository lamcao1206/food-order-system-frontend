import { Box, Stack, Text, Grid } from "@mantine/core";
import { useTranslation } from "react-i18next";
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

const getProductData = (t: any) => [
  {
    id: 25,
    name: t('products.bbqChickenDrumsticks.name'),
    description: t('products.bbqChickenDrumsticks.description'),
    type: { price: 175 },
    image: Chicken1,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 13,
    name: t('products.onionRings.name'),
    description: t('products.onionRings.description'),
    type: { price: 100 },
    image: OnionRings,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 14,
    name: t('products.chickenWings.name'),
    description: t('products.chickenWings.description'),
    type: { price: 130 },
    image: ChickenWing,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 1,
    name: t('products.seafoodGreenPepperPizza.name'),
    description: t('products.seafoodGreenPepperPizza.description'),
    type: [
      { size: 9, price: 230 },
      { size: 12, price: 280 },
    ],
    image: PizzaSeaFood,
    category: FoodCategory.PIZZA,
  },
  {
    id: 2,
    name: t('products.seafoodMayonnaisePizza.name'),
    description: t('products.seafoodMayonnaisePizza.description'),
    type: [
      { size: 9, price: 240 },
      { size: 12, price: 290 },
    ],
    image: PizzaSeaFood,
    category: FoodCategory.PIZZA,
  },
  {
    id: 5,
    name: t('products.bbqChickenSupremePizza.name'),
    description: t('products.bbqChickenSupremePizza.description'),
    type: [
      { size: 9, price: 270 },
      { size: 12, price: 320 },
    ],
    image: PizzaVegan,
    category: FoodCategory.PIZZA,
  },
  {
    id: 10,
    name: t('products.mozzarellaCheeseSticks.name'),
    description: t('products.mozzarellaCheeseSticks.description'),
    type: { price: 120 },
    image: mozzarella,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 6,
    name: t('products.veggieDelightPizza.name'),
    description: t('products.veggieDelightPizza.description'),
    type: [
      { size: 9, price: 220 },
      { size: 12, price: 270 },
    ],
    image: PizzaVegan,
    category: FoodCategory.PIZZA,
  },
  {
    id: 15,
    name: t('products.spaghettiCarbonara.name'),
    description: t('products.spaghettiCarbonara.description'),
    type: { price: 180 },
    image: Pasta1,
    category: FoodCategory.PASTA,
  },
  {
    id: 7,
    name: t('products.hawaiianPineapplePizza.name'),
    description: t('products.hawaiianPineapplePizza.description'),
    type: [
      { size: 9, price: 245 },
      { size: 12, price: 295 },
    ],
    image: PizzaSausage,
    category: FoodCategory.PIZZA,
  },
  {
    id: 9,
    name: t('products.garlicBread.name'),
    description: t('products.garlicBread.description'),
    type: { price: 90 },
    image: GarlicBread,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 23,
    name: t('products.honeyGlazedChicken.name'),
    description: t('products.honeyGlazedChicken.description'),
    type: { price: 170 },
    image: Chicken3,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 26,
    name: t('products.teriyakiChicken.name'),
    description: t('products.teriyakiChicken.description'),
    type: { price: 180 },
    image: Chicken3,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 11,
    name: t('products.bruschetta.name'),
    description: t('products.bruschetta.description'),
    type: { price: 95 },
    image: Bruschetta,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 12,
    name: t('products.stuffedMushrooms.name'),
    description: t('products.stuffedMushrooms.description'),
    type: { price: 110 },
    image: StuffedMushroom,
    category: FoodCategory.APPETIZER,
  },
  {
    id: 3,
    name: t('products.seafoodPestoLemonCreamPizza.name'),
    description: t('products.seafoodPestoLemonCreamPizza.description'),
    type: [
      { size: 9, price: 250 },
      { size: 12, price: 300 },
    ],
    image: PizzaVegan,
    category: FoodCategory.PIZZA,
  },
  {
    id: 21,
    name: t('products.crispyFriedChicken.name'),
    description: t('products.crispyFriedChicken.description'),
    type: { price: 150 },
    image: Chicken1,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 22,
    name: t('products.spicyGrilledChicken.name'),
    description: t('products.spicyGrilledChicken.description'),
    type: { price: 165 },
    image: Chicken2,
    category: FoodCategory.CHICKEN,
  },
  {
    id: 4,
    name: t('products.beefCheeseBurstPizza.name'),
    description: t('products.beefCheeseBurstPizza.description'),
    type: [
      { size: 9, price: 260 },
      { size: 12, price: 310 },
    ],
    image: PizzaSausage,
    category: FoodCategory.PIZZA,
  },
  {
    id: 16,
    name: t('products.seafoodAlfredoPasta.name'),
    description: t('products.seafoodAlfredoPasta.description'),
    type: { price: 210 },
    image: Pasta2,
    category: FoodCategory.PASTA,
  },
  {
    id: 17,
    name: t('products.penneArrabbiata.name'),
    description: t('products.penneArrabbiata.description'),
    type: { price: 170 },
    image: Pasta3,
    category: FoodCategory.PASTA,
  },
  {
    id: 18,
    name: t('products.fettuccineAlfredo.name'),
    description: t('products.fettuccineAlfredo.description'),
    type: { price: 200 },
    image: Pasta4,
    category: FoodCategory.PASTA,
  },
  {
    id: 19,
    name: t('products.bolognesePasta.name'),
    description: t('products.bolognesePasta.description'),
    type: { price: 190 },
    image: Pasta2,
    category: FoodCategory.PASTA,
  },
  {
    id: 8,
    name: t('products.fourCheeseExtravaganzaPizza.name'),
    description: t('products.fourCheeseExtravaganzaPizza.description'),
    type: [
      { size: 9, price: 255 },
      { size: 12, price: 305 },
    ],
    image: PizzaSausage,
    category: FoodCategory.PIZZA,
  },
  {
    id: 20,
    name: t('products.pestoPasta.name'),
    description: t('products.pestoPasta.description'),
    type: { price: 185 },
    image: Pasta4,
    category: FoodCategory.PASTA,
  },
  {
    id: 24,
    name: t('products.lemonHerbChicken.name'),
    description: t('products.lemonHerbChicken.description'),
    type: { price: 160 },
    image: Chicken4,
    category: FoodCategory.CHICKEN,
  },
];



interface ProductGridProps {
  category: string;
  searchQuery?: string;
}

const ProductGrid = ({ category, searchQuery }: ProductGridProps) => {
  const { t } = useTranslation('food');
  const foodProducts = getProductData(t);
  
  let products = [...foodProducts];
  console.log(category);
  if (category) {
    products = products.filter((product) => product.category === category);
  }
  
  if (searchQuery) {
    products = products.filter((product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
            {t('products.superExtraTopping')}
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
