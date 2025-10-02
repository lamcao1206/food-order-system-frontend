import type { IUser } from "@/interfaces/user.interface";
import type { StateCreator } from "zustand";

export interface IUserState  {
  user: IUser | null;

  actions: {
    setUser: (user: IUser) => void;
    clearUser: () => void;
  }
}

const userSlice: StateCreator<IUserState> = (set) => ({
  user: null,

  actions: {
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  },
})

export default userSlice;
