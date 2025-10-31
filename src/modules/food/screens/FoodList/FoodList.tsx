import { useState } from "react";
import { Container, Group, Button, Box } from "@mantine/core";
import { OrderDetail } from "../../components/OrderDetail";
import classes from "./FoodList.module.scss";
import { ProductGrid } from "../../components/ProductGrid";
import { NavbarLanding } from "../../../landing/components/Navbar/Navbar";

const FoodList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const subNavItems = [
    { label: "all" },
    { label: "pizza" },
    { label: "pasta" },
    { label: "appetizer" },
    { label: "chicken" },
  ];

  return (
    <div>
      <NavbarLanding />

      <Container fluid className={classes.mainContent}>
        <Box className={classes.productDisplay}>
          {/* Sub Navigation (Pills) */}
          <Group className={classes.subNavPill} wrap="nowrap">
            {subNavItems.map((item) => (
              <Button
                key={item.label}
                variant="default"
                className={`${classes.pillButton} ${
                  selectedCategory === item.label
                    ? classes.activePill
                    : classes.inactivePill
                }`}
                size="xs"
                onClick={() => setSelectedCategory(item.label)}
              >
                {item.label.toUpperCase()}
              </Button>
            ))}
          </Group>

          <ProductGrid category={selectedCategory === 'all'? '': selectedCategory} />
        </Box>

        <OrderDetail />
      </Container>
    </div>
  );
};

export default FoodList;
