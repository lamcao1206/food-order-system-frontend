import { create } from 'zustand';
import userSlice, { type IUserState } from '../slices/userSlice';

const useUserStore = create<IUserState>()((...params) => ({
  ...userSlice(...params),
}));

export default useUserStore;

export const getUser = () => useUserStore.getState().user;
