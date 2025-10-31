import { create } from "zustand";
import orderSlice, { type IOrderState } from "../slices/orderSlice";

const useOrderStore = create<IOrderState>()((...params) => ({
  ...orderSlice(...params),
}));

export default useOrderStore;
export const getCart = () => useOrderStore.getState().cart;
