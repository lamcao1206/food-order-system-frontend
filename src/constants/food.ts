import type {IDiscount} from '../interfaces/food.interface';

export enum FoodCategory {
    PIZZA = 'pizza',
    PASTA = 'pasta',
    APPETIZER = 'appetizer',
    CHICKEN = 'chicken'
}

export const discounts: IDiscount[] = [
  {
    id:1,
    name: "STARTER DEAL",
    description: "Discount when the order is greater than 200.000đ",
    value: "5%",
    available: 200,
    maxValue: 20,
  },
  {
    id:2,
    name: "HAPPY ORDER",
    description: "Discount when the order is greater than 250.000đ",
    value: "7%",
    available: 250,
    maxValue: 35,
  },
  {
    id:3,
    name: "BIG SAVER",
    description: "Discount when the order is greater than 350.000đ",
    value: "10%",
    available: 350,
    maxValue: 70
  },
  {
    id:4,
    name: "SUPER SAVER",
    description: "Discount when the order is greater than 500.000đ",
    value: "20%",
    available: 500,
    maxValue: 150
  },
];

export const vouchers: Record<string, number> = {
  HAPPYDAYS: 10,
  MYDISCOUNT: 50,
  NEWFRIEND: 100,
};