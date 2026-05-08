import { use, Suspense } from "react";
import Loading from "../../games/components/Loading.jsx";
import EmptyResult from "../../games/components/EmptyResult.jsx";
import GameCard from "../../games/components/GameCard.jsx";
import { getGames } from "../../../shared/api/";
import { MdOutlineTrendingUp as UpIcon } from "react-icons/md";
const getTrendingGamesPromise = getGames({
  pageSize: 6,
  ordering: "-metacritic released",
});

function TrendingGamesContainer() {
  return (
    <Suspense fallback={<Loading />}>
      <TrendingGames />
    </Suspense>
  );
}

function TrendingGames() {
  const games = use(getTrendingGamesPromise);
  console.log(games);
  return (
    <div className="space-y-8 py-4">
      <div className="flex gap-x-4">
        <UpIcon
          size={32}
          fill="var(--primary)"
          className="bg-primary/40 rounded-(--radius)"
        />
        <h2
          className="text-foreground text-3xl font-bold
          uppercase "
        >
          Trending games
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {!games || (games.results.length === 0 && <EmptyResult />)}
        {games.results.length > 0 &&
          games.results.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}

export default TrendingGamesContainer;
