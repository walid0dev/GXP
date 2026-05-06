import { use, useEffect } from "react";
import GameCard from "./GameCard";
import EmptyResult from "./EmptyResult.jsx";
import Pagination from "./Pagination.jsx";
import { useGameExplorerStore } from "../store";

const GameCardsContainer = ({ getGamesPromise }) => {
  const games = use(getGamesPromise);
  const setPaginationLinks = useGameExplorerStore((s) => s.setPaginationLinks);

  useEffect(() => {
    setPaginationLinks({
      prevPage: games?.previous ?? null,
      nextPage: games?.next ?? null,
    });
  }, [games?.next, games?.previous, setPaginationLinks]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4 ">
        {!games || (games.results.length === 0 && <EmptyResult />)}
        {games.results.length > 0 &&
          games.results.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default GameCardsContainer;
