import type { CommentItem, IDiscount, OrderItem } from "../interfaces/food.interface";

export enum FoodCategory {
  PIZZA = "pizza",
  PASTA = "pasta",
  APPETIZER = "appetizer",
  CHICKEN = "chicken",
}

export const discounts: IDiscount[] = [
  {
    id: 1,
    name: "STARTER DEAL",
    description: "Discount when the order is greater than 200.000đ",
    value: "5%",
    available: 200,
    maxValue: 20,
  },
  {
    id: 2,
    name: "HAPPY ORDER",
    description: "Discount when the order is greater than 250.000đ",
    value: "7%",
    available: 250,
    maxValue: 35,
  },
  {
    id: 3,
    name: "BIG SAVER",
    description: "Discount when the order is greater than 350.000đ",
    value: "10%",
    available: 350,
    maxValue: 70,
  },
  {
    id: 4,
    name: "SUPER SAVER",
    description: "Discount when the order is greater than 500.000đ",
    value: "20%",
    available: 500,
    maxValue: 150,
  },
];

export const vouchers: Record<string, number> = {
  HAPPYDAYS: 10,
  MYDISCOUNT: 50,
  NEWFRIEND: 100,
};

export enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export const comments: CommentItem[] = [
  {
    foodId: 1,
    comments: [
      {
        user: { id: "2", name: "minhtrinh" },
        text: "Món ăn này ngon lắm",
      },
      {
        user: { id: "3", name: "namkhanhho" },
        text: "Món ăn cũng tạm",
      },
      {
        user: { id: "4", name: "phuonglannguyen" },
        text: "Phải thử thêm lần nữa mới biết",
      },
    ],
  },
  {
    foodId: 2,
    comments: [
      {
        user: { id: "5", name: "tranghuyentran" },
        text: "Đồ uống ngon, phục vụ nhanh",
      },
      {
        user: { id: "6", name: "tuminhtran" },
        text: "Ngon nhưng hơi đắt",
      },
    ],
  },
  {
    foodId: 3,
    comments: [
      {
        user: { id: "7", name: "huyquocphan" },
        text: "Chất lượng món ăn ổn",
      },
      {
        user: { id: "8", name: "tungthanhnguyen" },
        text: "Mình thấy hơi nhạt",
      },
      {
        user: { id: "9", name: "nhunghongnguyen" },
        text: "Sẽ quay lại lần sau",
      },
    ],
  },
];

export const orderHistories: OrderItem[] = [
  {
    orderDate: "14:30:00 13/11/2025",
    deliveryFee: 15000,
    discount: 10000,
    extraVoucher: 5000,
    paymentMethod: "Cash on delivery",
    address: "123 Nguyễn Văn Cừ, Quận 5",
    cart: [
      { id: 1, name: "Honey Glazed Chicken", price: 170000, quantity: 1 },
    ],
    status: OrderStatus.COMPLETED,
    rating: null,
  },
  {
    orderDate: "10:30:00 7/11/2025",
    deliveryFee: 20000,
    discount: 0,
    extraVoucher: 10000,
    paymentMethod: "Cash on delivery",
    address: "55 Trần Hưng Đạo, Quận 1",
    cart: [
      { id: 3, name: "Spaghetti Carbonara", price: 180000, quantity: 1 },
      { id: 4, name: "Teriyaki Chicken", price: 180000, quantity: 1 },
    ],
    status: OrderStatus.COMPLETED,
    rating: 4,
  },
  {
    orderDate: "8:00:00 6/11/2025",
    deliveryFee: 15000,
    discount: 20000,
    extraVoucher: 0,
    paymentMethod: "Cash on delivery",
    address: "456 Lê Lợi, Quận 3",
    cart: [
      { id: 5, name: "Stuffed Mushrooms", price: 110000, quantity: 2 },
      { id: 6, name: "Crispy Fried Chicke", price: 150000, quantity: 1 },
    ],
    status: OrderStatus.COMPLETED,
    rating: null,
  },
];