import type { IUser } from "@/interfaces/user.interface";
import type { StateCreator } from "zustand";

export interface IUserState  {
  user: IUser | null;

  actions: {
    setUser: (user: IUser) => void;
    clearUser: () => void;
    addLoyaltyPoints: (points: number) => void;
  }
}

const userSlice: StateCreator<IUserState> = (set) => ({
  user: null,

  actions: {
    setUser: (user) => {
      // Load loyalty points from localStorage if they exist
      const storedPoints = localStorage.getItem(`loyaltyPoints_${user.id}`);
      const loyaltyPoints = storedPoints ? parseInt(storedPoints, 10) : (user.loyaltyPoints ?? 0);
      set({ user: { ...user, loyaltyPoints } });
      // Save to localStorage
      localStorage.setItem(`loyaltyPoints_${user.id}`, loyaltyPoints.toString());
    },
    clearUser: () => set({ user: null }),
    addLoyaltyPoints: (points: number) => {
      set((state) => {
        if (!state.user) return state;
        const currentPoints = state.user.loyaltyPoints ?? 0;
        const newPoints = Math.max(0, currentPoints + points); // Prevent negative points
        const updatedUser = { ...state.user, loyaltyPoints: newPoints };
        // Save to localStorage
        localStorage.setItem(`loyaltyPoints_${state.user.id}`, newPoints.toString());
        return { user: updatedUser };
      });
    },
  },
})

export default userSlice;
