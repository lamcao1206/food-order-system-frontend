import { Container, Title, Table, Badge, Paper, Text, Box, Stack } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavbarLanding } from "@/modules/landing/components/Navbar/Navbar";
import classes from "./RestaurantOrderList.module.scss";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  items: OrderItem[];
  total: number;
  address: string;
  paymentMethod: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    orderDate: "2025-11-20 10:30 AM",
    status: "preparing",
    items: [
      { id: "1", productName: "Margherita Pizza", quantity: 2, price: 12.99 },
      { id: "2", productName: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    total: 34.97,
    address: "123 Main St, City, State 12345",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    orderDate: "2025-11-20 11:15 AM",
    status: "pending",
    items: [
      { id: "3", productName: "Pepperoni Pizza", quantity: 1, price: 14.99 },
      { id: "4", productName: "Garlic Bread", quantity: 2, price: 5.99 },
    ],
    total: 26.97,
    address: "456 Oak Ave, City, State 12345",
    paymentMethod: "Cash",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    orderDate: "2025-11-20 09:45 AM",
    status: "delivering",
    items: [
      { id: "5", productName: "Hawaiian Pizza", quantity: 1, price: 13.99 },
      { id: "6", productName: "Chicken Wings", quantity: 1, price: 9.99 },
      { id: "7", productName: "Mozzarella Sticks", quantity: 1, price: 6.99 },
    ],
    total: 30.97,
    address: "789 Pine Rd, City, State 12345",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    orderDate: "2025-11-20 08:30 AM",
    status: "completed",
    items: [
      { id: "8", productName: "Veggie Pizza", quantity: 2, price: 11.99 },
      { id: "9", productName: "Bruschetta", quantity: 1, price: 7.99 },
    ],
    total: 31.97,
    address: "321 Elm St, City, State 12345",
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-005",
    customerName: "Tom Brown",
    customerEmail: "tom@example.com",
    orderDate: "2025-11-19 07:20 PM",
    status: "completed",
    items: [
      { id: "10", productName: "BBQ Chicken Pizza", quantity: 1, price: 15.99 },
      { id: "11", productName: "Onion Rings", quantity: 1, price: 5.99 },
    ],
    total: 21.98,
    address: "654 Maple Dr, City, State 12345",
    paymentMethod: "Cash",
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'preparing':
      return 'blue';
    case 'delivering':
      return 'grape';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
};

const RestaurantOrderList = () => {
  const { t } = useTranslation('restaurant');
  const [orders] = useState<Order[]>(mockOrders);

  const rows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>
        <Text fw={600} size="sm">{order.id}</Text>
      </Table.Td>
      <Table.Td>
        <div>
          <Text size="sm" fw={500}>{order.customerName}</Text>
          <Text size="xs" c="dimmed">{order.customerEmail}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Stack gap={4}>
          {order.items.map((item) => (
            <Text key={item.id} size="xs">
              {item.quantity}x {item.productName}
            </Text>
          ))}
        </Stack>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{order.orderDate}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(order.status)} variant="light">
          {t(`status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={600}>${order.total.toFixed(2)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="xs">{order.address}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{order.paymentMethod}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{backgroundColor: '#f8f9fa'}}>
      <NavbarLanding />
      
      <Container size="xl" className={classes.container}>
        <Box className={classes.header}>
          <Title order={1} className={classes.title}>
            {t('title')}
          </Title>
          <Text c="dimmed" size="sm">
            {t('subtitle')}
          </Text>
        </Box>

        <Paper shadow="sm" p="md" className={classes.tableContainer}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('orderId')}</Table.Th>
                <Table.Th>{t('customer')}</Table.Th>
                <Table.Th>{t('items')}</Table.Th>
                <Table.Th>{t('orderDate')}</Table.Th>
                <Table.Th>{t('status')}</Table.Th>
                <Table.Th>{t('total')}</Table.Th>
                <Table.Th>{t('address')}</Table.Th>
                <Table.Th>{t('payment')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
};

export default RestaurantOrderList;
