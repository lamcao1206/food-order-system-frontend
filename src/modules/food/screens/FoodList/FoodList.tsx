import {
  Container,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { OrderDetail } from "../../components/OrderDetail";
import classes from "./FoodList.module.scss";
import {ProductGrid} from '../../components/ProductGrid/index';

const FoodList = () => {
  // const mainNavItems = [
  //   "Khuyến Mãi Mới Ngày",
  //   "Pizza",
  //   "Pizza Muffin",
  //   "Mỳ Ý",
  //   "Khai Vị",
  //   "Tráng Miệng",
  //   "Thức Uống",
  // ];
  const subNavItems = [
    { label: "All", active: true },
    { label: "Pasta", active: false },
    { label: "Appetizer", active: false },
    { label: "Chicken", active: false },
    { label: "Chicken", active: false },
  ];

  return (
    <div>
      {/* <Box className={classes.mainNavigation}>
        <Container size="lg" style={{ padding: 0 }}>
          <Tabs defaultValue="Pizza" variant="default" orientation="horizontal">
            <Tabs.List style={{ borderBottom: "none" }}>
              {mainNavItems.map((item) => (
                <Tabs.Tab
                  key={item}
                  value={item}
                  style={{
                    fontWeight: 600,
                    color: item === "Pizza" ? "#e53935" : "#495057",
                  }}
                >
                  {item}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </Container>
      </Box> */}

      <Container fluid className={classes.mainContent}>
        <Box className={classes.productDisplay}>
          {/* Sub Navigation (Pills) */}
          <Group className={classes.subNavPill} wrap="nowrap">
            {subNavItems.map((item) => (
              <Button
                key={item.label}
                variant="default"
                className={`${classes.pillButton} ${
                  item.active ? classes.activePill : classes.inactivePill
                }`}
                size="xs"
              >
                {item.label}
              </Button>
            ))}
          </Group>
          <ProductGrid/>
        </Box>
        <OrderDetail />
      </Container>
    </div>
  );
};

export default FoodList;
