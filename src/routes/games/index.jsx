import Genres from "./components/Genres";
import Search from "./components/Search";
import GameCardsContainer from "./components/GameCardsContainer";
import { useGameExplorerStore } from "./store";
import { getGames } from "../../shared/api/";
import Loading from "./components/Loading";
import { Suspense } from "react";
const Games = () => {
  const genres = useGameExplorerStore((s) => s.genres);
  const debouncedQuery = useGameExplorerStore((s) => s.debouncedQuery);
  const page = useGameExplorerStore((s) => s.page);
  const params = {};
  const activeGenres = getActiveGenres(genres);
  if (activeGenres) params.genres = activeGenres;
  if (debouncedQuery) params.search = debouncedQuery;
  params.page = page;
  const getGamesPromise = getGames(params);
  return (
    <div className="mt-24">
      <header className="flex w-full justify-between items-end ">
        <h1 className="text-4xl font-bold text-foreground">EXPLORE GAMES</h1>

        <Search />
      </header>
      <Genres />
      <Suspense fallback={<Loading />}>
        <GameCardsContainer getGamesPromise={getGamesPromise} />
      </Suspense>
    </div>
  );
};

const getActiveGenres = (genres) => {
  const active = genres
    .filter((g) => g.isActive)
    .map((g) => g.label.toLowerCase());
  if (active.length == 0) return null;
  return active.join(",");
};

export default Games;
