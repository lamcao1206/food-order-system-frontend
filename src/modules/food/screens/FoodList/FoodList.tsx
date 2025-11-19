import { useState } from "react";
import { Container, Group, Button, Box, TextInput, ActionIcon } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";
import { OrderDetail } from "../../components/OrderDetail";
import classes from "./FoodList.module.scss";
import { ProductGrid } from "../../components/ProductGrid";
import { NavbarLanding } from "../../../landing/components/Navbar/Navbar";

const FoodList = () => {
  const { t } = useTranslation('food');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const subNavItems = [
    { label: "all", key: "all" },
    { label: "pizza", key: "pizza" },
    { label: "pasta", key: "pasta" },
    { label: "appetizer", key: "appetizer" },
    { label: "chicken", key: "chicken" },
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
                {t(`categories.${item.key}`)}
              </Button>
            ))}
            
            <TextInput
              placeholder={t('categories.placeholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              size="sm"
              className={classes.searchInput}
              rightSection={
                <ActionIcon
                  variant="filled"
                  color="red"
                  size="md"
                  onClick={() => setSearchQuery(searchInput)}
                  className={classes.searchButton}
                >
                  <IconSearch size={18} />
                </ActionIcon>
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchQuery(searchInput);
                }
              }}
            />
          </Group>

          <ProductGrid category={selectedCategory === 'all'? '': selectedCategory} searchQuery={searchQuery} />
        </Box>

        <OrderDetail />
      </Container>
    </div>
  );
};

export default FoodList;
