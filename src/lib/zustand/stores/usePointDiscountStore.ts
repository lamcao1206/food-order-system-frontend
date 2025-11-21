import { create } from 'zustand';
import pointDiscountSlice, { type IPointDiscountState } from '../slices/pointDiscountSlice';

const usePointDiscountStore = create<IPointDiscountState>()((...params) => ({
  ...pointDiscountSlice(...params),
}));

export default usePointDiscountStore;

