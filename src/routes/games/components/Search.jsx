import { useGameExplorerStore } from "../store/index.js";
import { IoClose, IoSearch } from "react-icons/io5";

const Search = () => {
  const { searchQuery, setSearchQuery } = useGameExplorerStore();

  return (
    <div className="w-full max-w-lg">
      <label htmlFor="games-search" className="sr-only">
        Search games
      </label>

      <div className="group relative isolate overflow-hidden rounded-full border border-border/70 bg-card/90 shadow-md backdrop-blur transition-colors focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/30">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

        <div className="relative flex items-center py-1 gap-3 pl-4 pr-1">
          <IoSearch className="  text-2xl shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            id="games-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games, genres, studios..."
            className="h-12 w-full bg-transparent text-xl font-thin tracking-wide text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
          />
          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
              className="inline-flex size-10 aspect-square items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <IoClose className="text-2xl" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
