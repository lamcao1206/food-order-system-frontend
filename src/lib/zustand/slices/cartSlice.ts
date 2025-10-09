import type { StateCreator } from "zustand";
import type { CartItemInput } from "@/interfaces/food.interface";

export interface IFoodState {
  cart: CartItemInput[];

  actions: {
    addToCart: (item: CartItemInput) => void;
    removeFromCart: (itemId: number | string) => void;
    clearCart: () => void;
    updateQuantity: (itemId: number | string, quantity: number) => void;
  };
}

const cartSlice: StateCreator<IFoodState> = (set, get) => ({
  cart: [],

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
  },
});

export default cartSlice;
