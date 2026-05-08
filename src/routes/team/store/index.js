import { create } from "zustand";

export const useGameDevTeamStore = create((set, get) => ({
  prevPage: null,
  nextPage: null,
  page: 1,
  setPaginationLinks: ({ prevPage = null, nextPage = null } = {}) =>
    set({ prevPage, nextPage }),
  setPage: (page = 1) => {
    if (page === get().page) return;
    set((state) => ({ ...state, page }));
  },
}));
