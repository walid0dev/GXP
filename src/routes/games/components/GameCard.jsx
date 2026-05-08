import { NavLink } from "react-router-dom";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";

const getTagOrderScore = (seed, value) => {
  const text = `${seed}-${value}`;
  let hash = 0;

  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }

  return Math.abs(hash);
};

const GameCard = ({ game }) => {
  const {
    id,
    name,
    background_image: backgroundImage,
    rating,
    released,
    tags,
  } = game;

  const randomTags = [...(tags ?? [])]
    .sort((a, b) => getTagOrderScore(id, a.name) - getTagOrderScore(id, b.name))
    .slice(0, 4)
    .map((tag) => tag.name);

  const releaseDate = released
    ? new Date(released).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA";

  return (
    <NavLink
      to={`/games/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md transition-all duration-300 hover:border-primary/45 hover:shadow-xl"
      aria-label={`View ${name} details`}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={backgroundImage}
          alt={`${name} cover`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/85 via-background/20 to-transparent" />

        <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/85 px-3 py-1 text-sm font-medium text-foreground backdrop-blur">
          <FaStar className="text-amber-400" aria-hidden="true" />
          <span>{rating?.toFixed(1) ?? "N/A"}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4">
        <h3 className="line-clamp-2 text-xl font-semibold text-foreground ">
          {name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {randomTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-xs font-medium tracking-wide text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <hr className="border-border/70" />
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <FaRegCalendarAlt aria-hidden="true" />
            <span>{releaseDate}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default GameCard;
