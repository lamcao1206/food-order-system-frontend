import type { StateCreator } from "zustand";
import type { CartItemInput } from "@/interfaces/food.interface";

export interface IOrderState {
  cart: CartItemInput[];
  discount?: number | null;
  extraVoucher?: number | null;
  paymentMethod?: string | null;
  address?: string | null;
  orderDate?: string | null;
  deliveryFee: number | null;

  actions: {
    addToCart: (item: CartItemInput[]) => void;
    setDiscount: (value: number | null) => void;
    addVoucher: (value: number | null) => void;
    setPaymentMethod: (method: string) => void;
    setAddress: (address: string) => void;
    setOrderDate: () => void;
    setDeliveryFee: (fee: number | null) => void;
  };
}

const orderSlice: StateCreator<IOrderState> = (set) => ({
  cart: [],
  discount: null,
  extraVoucher: null,
  paymentMethod: null,
  address: null,
  orderDate: null,
  deliveryFee: null,

  actions: {
    addToCart: (item: CartItemInput[]) => {
      set({ cart: item });
    },

    setDiscount: (value: number | null) => {
      set({ discount: value });
    },

    addVoucher: (value: number | null) => {
      set({ extraVoucher: value });
    },

    setPaymentMethod: (method: string) => {
      set({ paymentMethod: method });
    },

    setAddress: (address: string) => {
      set({ address });
    },

    setOrderDate: () => {
      const now = new Date();
      const formatted = now.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      set({ orderDate: formatted });
    },
    setDeliveryFee: (fee: number | null) => {
        set({deliveryFee: fee})
    }
  },
});

export default orderSlice;
