import { create } from "zustand";
import commentSlice, { type ICommentState } from "../slices/commentSlice";

const useCommentStore = create<ICommentState>()((...params) => ({
  ...commentSlice(...params),
}));

export default useCommentStore;
export const getCart = () => useCommentStore.getState().data;