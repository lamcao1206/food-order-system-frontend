import type { StateCreator } from "zustand";
import type { OrderItem } from "@/interfaces/food.interface";
import {orderHistories} from "@/constants/food";

export interface OrderHistoryState {
  orders: OrderItem[];
  actions: {
    addOrder: (order: OrderItem) => void;
    updateRating: (orderIndex: number, rating: number) => void;
  };
}

const orderHistorySlice: StateCreator<OrderHistoryState> = (set) => ({
  orders: orderHistories,

  actions: {
    addOrder: (order: OrderItem) =>
      set((state) => ({
        orders: [order, ...state.orders],
      })),

    updateRating: (orderIndex: number, rating: number) =>
      set((state) => ({
        orders: state.orders.map((o, i) =>
          i === orderIndex ? { ...o, rating } : o
        ),
      })),
  },
});

export default orderHistorySlice;
