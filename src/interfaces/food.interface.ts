import { FoodCategory } from "../constants/food";
export enum Base {
  THIN = "Thin Base Fresh Dough",
  MEDIUM = "Medium Base Fresh Dough",
  THICK = "Thick Base Fresh Dough",
}

export interface CartItemInput {
  id: number;
  name: string;
  size?: number;
  price: number;
  quantity: number;
  base?: Base;
  additionalCheese?: string;
  additionalCrust?: string;
}

export interface ProductType {
  size?: number;
  price: number;
}
export interface ProductFormInput {
  id: number;
  name: string;
  type: ProductType | ProductType[];
  image: string;
  description?: string;
  category: FoodCategory;
}

export interface IDiscount {
  id: number,
  name: string;
  description: string;
  value: string;
  available: number;
  maxValue: number;
}