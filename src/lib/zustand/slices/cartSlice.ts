import type { StateCreator } from "zustand";
import type { CartItemInput } from "@/interfaces/food.interface";

export interface IFoodState {
  cart: CartItemInput[];
  discount?: number | null;
  extraVoucher?: number | null;

  actions: {
    addToCart: (item: CartItemInput) => void;
    removeFromCart: (itemId: number | string) => void;
    clearCart: () => void;
    updateQuantity: (itemId: number | string, quantity: number) => void;
    setDiscount: (value: number | null) => void;
    addVoucher: (value: number | null) => boolean;
  };
}

const cartSlice: StateCreator<IFoodState> = (set, get) => ({
  cart: [],
  discount: null,
  voucher: null,

  actions: {
    addToCart: (item) => {
      const cart = get().cart;
      const exist = cart.find(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.base === item.base &&
          i.additionalCheese === item.additionalCheese &&
          i.additionalCrust === item.additionalCrust
      );
      if (exist) {
        set({
          cart: cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        });
      } else {
        set({ cart: [...cart, item] });
      }
    },

    removeFromCart: (itemId) => {
      set({ cart: get().cart.filter((item) => item.id !== itemId) });
    },

    clearCart: () => set({ cart: [] }),

    updateQuantity: (itemId, quantity) => {
      set({
        cart: get().cart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      });
    },
    setDiscount: (value: number | null) => {
      set({ discount: value });
    },

    addVoucher: (value: number | null) => {
      const { extraVoucher } = get();
      if (extraVoucher != null) {
        return false;
      }
      set({ extraVoucher: value });
      return true;
    },
  },
});

export default cartSlice;
