import { useGameExplorerStore } from "../store";

const Pagination = () => {
  const page = useGameExplorerStore((s) => s.page);
  const setPage = useGameExplorerStore((s) => s.setPage);
  const prevPage = useGameExplorerStore((s) => s.prevPage);
  const nextPage = useGameExplorerStore((s) => s.nextPage);

  const canGoPrev = Boolean(prevPage) && page > 1;
  const canGoNext = Boolean(nextPage);

  return (
    <nav
      className="flex items-center justify-center"
      aria-label="Games pagination controls"
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/90 p-2 shadow-lg backdrop-blur">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() => canGoPrev && setPage(page - 1)}
          className="rounded-full border border-border/70 px-5 py-2 text-sm tracking-[0.18em] text-muted-foreground uppercase transition-all hover:border-primary/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-45"
        >
          Prev
        </button>
        <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-primary uppercase">
          Page {page}
        </span>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => canGoNext && setPage(page + 1)}
          className="rounded-full border border-border/70 px-5 py-2 text-sm tracking-[0.18em] text-muted-foreground uppercase transition-all hover:border-primary/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
