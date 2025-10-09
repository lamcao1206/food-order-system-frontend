import { Box } from "@mantine/core";
import { OrderItemsList } from "../OrderItemsList";
import {OrderSummary} from "../OrderSummary";
import classes from "./OrderDetail.module.scss";

const OrderDetail = () => {
  return (
    <Box className={classes.orderDetail}>
      <OrderItemsList />
      <OrderSummary/>
    </Box>
  );
};

export default OrderDetail;
