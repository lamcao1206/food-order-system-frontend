import type { StateCreator } from "zustand";

export interface IPointDiscount {
  code: string;
  discountPercent: number;
  createdAt: number;
  used: boolean;
}

export interface IPointDiscountState {
  discounts: IPointDiscount[];

  actions: {
    addDiscount: (code: string) => void;
    useDiscount: (code: string) => void;
    getAvailableDiscounts: () => IPointDiscount[];
  };
}

// Generate a random 6-character code
const generateDiscountCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const pointDiscountSlice: StateCreator<IPointDiscountState> = (set, get) => {
  // Load discounts from localStorage on initialization
  const loadDiscounts = (): IPointDiscount[] => {
    const stored = localStorage.getItem('pointDiscounts');
    return stored ? JSON.parse(stored) : [];
  };

  const saveDiscounts = (discounts: IPointDiscount[]) => {
    localStorage.setItem('pointDiscounts', JSON.stringify(discounts));
  };

  const initialDiscounts = loadDiscounts();

  return {
    discounts: initialDiscounts,

    actions: {
      addDiscount: (code: string) => {
        const newDiscount: IPointDiscount = {
          code,
          discountPercent: 10,
          createdAt: Date.now(),
          used: false,
        };
        const updatedDiscounts = [...get().discounts, newDiscount];
        set({ discounts: updatedDiscounts });
        saveDiscounts(updatedDiscounts);
      },
      useDiscount: (code: string) => {
        const updatedDiscounts = get().discounts.map((discount) =>
          discount.code === code ? { ...discount, used: true } : discount
        );
        set({ discounts: updatedDiscounts });
        saveDiscounts(updatedDiscounts);
      },
      getAvailableDiscounts: () => {
        return get().discounts.filter((discount) => !discount.used);
      },
    },
  };
};

export default pointDiscountSlice;

