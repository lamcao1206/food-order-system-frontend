import { create } from "zustand";
import cartSlice, { type IFoodState } from "../slices/cartSlice";

const useCartStore = create<IFoodState>()((...params) => ({
  ...cartSlice(...params),
}));

export default useCartStore;
export const getCart = () => useCartStore.getState().cart;
