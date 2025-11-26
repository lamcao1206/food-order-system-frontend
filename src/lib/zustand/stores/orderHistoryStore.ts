import { create } from 'zustand';
import orderHistorySlice, { type OrderHistoryState } from '../slices/orderHistorySlice';

const useOrderHistoryState = create<OrderHistoryState>()((...params) => ({
  ...orderHistorySlice(...params),
}));

export default useOrderHistoryState;

