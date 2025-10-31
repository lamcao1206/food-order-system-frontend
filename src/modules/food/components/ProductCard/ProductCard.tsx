import { Box, Group, Stack, Text } from "@mantine/core";
import classes from "./ProductCard.module.scss";
import type { ProductFormInput } from "@/interfaces/food.interface";
import { FoodCustomizeModal } from "../FoodCustomizeModal/index";
import { useState } from "react";

interface ProductCardProps {
  product: ProductFormInput;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Box className={classes.productCard} onClick={() => setOpened(true)}>
        <Box className={classes.productImage}>
          <img
            src={product.image}
            alt="pizza image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Stack className={classes.productDetails}>
          <Text className={classes.productName}>{product.name}</Text>
          <Group className={classes.productInfo}>
            {Array.isArray(product.type) ? (
              <>
                <Text className={classes.productInfoText}>
                  {`${product.type[0]?.size} inch`}
                </Text>
                <Text className={classes.productInfoText}>-</Text>
                <Text className={classes.productInfoText}>
                  {`${product.type[0]?.price}.000₫`}
                </Text>
              </>
            ) : (
              <Text className={classes.productInfoText}>
                {`${product.type.price}.000₫`}
              </Text>
            )}
          </Group>
        </Stack>
      </Box>
      <FoodCustomizeModal
        opened={opened}
        onClose={() => setOpened(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
