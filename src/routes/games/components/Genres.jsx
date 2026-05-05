import { BiFilterAlt } from "react-icons/bi";
import { useGameExplorerStore } from "../store";

export default function Genres() {
  const { genres, setGenres } = useGameExplorerStore();
  console.log(genres.filter((g) => g.isActive));
  return (
    <div className="mt-6 flex flex-wrap items-start gap-3">
      <div className="inline-flex items-baseline gap-2 px-4 py-2 text-lg font-medium text-muted-foreground">
        <BiFilterAlt className="text-base" />
        Genres :
      </div>
      <div className="flex gap-4 flex-wrap items-center *:basis-1/6 justify-center ">
        {genres.map((genre) => (
          <button
            key={genre.label}
            type="button"
            aria-pressed={genre.isActive}
            onClick={() => setGenres(genre.label)}
            className={`cursor-pointer inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              genre.isActive
                ? "border-primary bg-primary/15 text-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]"
                : "border-border/70 bg-card text-muted-foreground hover:border-primary/35 hover:text-foreground"
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>
    </div>
  );
}
