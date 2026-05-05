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

export const useGameExplorerStore = create((set, get) => ({
  searchQuery: "",
  genres: genreLabels.map((label) => ({ label, isActive: false })),

  setSearchQuery: (query = "") => {
    return set((state) => ({ ...state, searchQuery: query }));
  },
  setGenres: (genre = "") => {
    return set((state) => ({
      ...state,
      genres: state.genres.map((item) =>
        item.label === genre ? { ...item, isActive: !item.isActive } : item
      ),
    }));
  },
  page: 1,
  setPage: (page = 1) => {
    if (page === get().page) return;
    return set((state) => ({ ...state, page }));
  },
}));
