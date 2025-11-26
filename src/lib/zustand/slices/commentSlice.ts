import type { CommentEntry, CommentItem } from "@/interfaces/food.interface";
import type { StateCreator } from "zustand";

import { comments } from "@/constants/food";

export interface ICommentState {
  data: CommentItem[];
  actions: {
    addComment: (
      foodId: number,
      user: { id: string; name: string },
      comment: string
    ) => void;
    setComments: (foodId: number, comments: CommentEntry[]) => void;
    clearCommentsByFood: (foodId: number) => void;
    resetComments: () => void;
  };
}

const commentSlice: StateCreator<ICommentState> = (set) => ({
  data: comments,

  actions: {
    addComment: (foodId, user, comment) => {
      set((state) => {
        const existing = state.data.find((item) => item.foodId === foodId);
        const entry: CommentEntry = { user, text: comment };
        if (existing) {
          existing.comments.push(entry);
          return { data: [...state.data] };
        } else {
          return { data: [...state.data, { foodId, comments: [entry] }] };
        }
      });
    },

    setComments: (foodId, comments) => {
      set((state) => {
        const existing = state.data.find((item) => item.foodId === foodId);
        if (existing) {
          existing.comments = comments;
          return { data: [...state.data] };
        } else {
          return { data: [...state.data, { foodId, comments }] };
        }
      });
    },

    clearCommentsByFood: (foodId) => {
      set((state) => ({
        data: state.data.filter((item) => item.foodId !== foodId),
      }));
    },

    resetComments: () => {
      set({ data: [] });
    },
  },
});

export default commentSlice;
