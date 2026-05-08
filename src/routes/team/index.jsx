import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { getGameDevelopmentTeam } from "../../shared/api";
import Loading from "../games/components/Loading.jsx";
import DevTeamContainer from "./components/DevTeamContainer.jsx";
import { useGameDevTeamStore } from "./store";

const Team = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const page = useGameDevTeamStore((state) => state.page);
  const getGameDevelopmentTeamPromise = getGameDevelopmentTeam(gameId, { page });

  return (
    <Suspense fallback={<Loading />}>
      <DevTeamContainer
        getGameDevTeamPromise={getGameDevelopmentTeamPromise}
        gameId={gameId}
      />
    </Suspense>
  );
};

export default Team;
