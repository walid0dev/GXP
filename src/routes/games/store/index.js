import { create } from "zustand";

const genreLabels = [
  "Action",
  "Adventure",
  "Indie",
  "Platformer",
  "Puzzle",
  "RPG",
  "Shooter",
];

export const useGameExplorerStore = create((set, get) => {
  let debounceTimer;
  return {
    searchQuery: "",
    prevPage: null,
    nextPage: null,
    setPaginationLinks: ({ prevPage = null, nextPage = null } = {}) =>
      set({ prevPage, nextPage }),
    debouncedQuery: "",
    genres: genreLabels.map((label) => ({ label, isActive: false })),

    setSearchQuery: (query = "") => {
      set((state) => ({ ...state, searchQuery: query, page: 1 }));
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        set({ debouncedQuery: query });
      }, 600);
    },
    setGenres: (genre = "") => {
      console.log(
        get()
          .genres.filter((g) => g.isActive)
          .map((g) => g.label)
          .join(","),
      );
      return set((state) => ({
        ...state,
        page: 1,
        genres: state.genres.map((item) =>
          item.label === genre ? { ...item, isActive: !item.isActive } : item,
        ),
      }));
    },

    page: 1,
    setPage: (page = 1) => {
      if (page === get().page) return;
      return set((state) => ({ ...state, page }));
    },
  };
});
