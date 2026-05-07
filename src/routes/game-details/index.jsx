import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getGameById } from "../../shared/api";
import gameExample from "../../../assets/game.example.json";
// import {PacmanLoader} from "react-spinners";

const GameDetails = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        setError("");

        const gameId = Number(id);

        if (!gameId || gameId <= 0) {
          setError("Invalid game id");
          return;
        }

        const data = await getGameById(gameId);

        setGame(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch game details");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
    // if (loading) return <PacmanLoader color="var(--primary)" size={44} />;

  if (error) return <h1>{error}</h1>;

  if (!game) return <h1>No game found</h1>;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white px-6 py-10">
      {/* BACK BUTTON */}
      <button className="mb-6 text-gray-300 hover:text-white transition">
        ← Back to Games
      </button>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide">
            {game?.name}
          </h1>

          {/* INFO */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded">
              ⭐ {game?.rating}
            </span>
            <span>📅 {game?.released}</span>
          </div>

          {/* IMAGE */}
          <img
            src={game?.background_image}
            alt={game?.name}
            className="w-full mt-6 rounded-2xl shadow-2xl"
          />

          {/* ABOUT */}
          <h2 className="mt-8 text-xl font-bold uppercase">About</h2>
          <p className="mt-3 text-gray-300 leading-relaxed">
            {game?.description_raw}
          </p>

          {/* GENRES */}
          <div className="mt-6">
            <h3 className="text-sm text-gray-400 uppercase mb-2">Genres</h3>

            <div className="flex flex-wrap gap-2">
              {game?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 rounded-full text-sm hover:bg-blue-500 transition"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-[#111827] p-5 rounded-2xl shadow-xl h-fit">
          <h3 className="text-sm text-gray-400 uppercase mb-4">
            Developer Tools
          </h3>

          <NavLink
            to="developers"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg mb-6 text-center block"
          >
            View Developers ↗
          </NavLink>

          {/* INFO BOX */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Metacritic</span>
              <span className="text-green-400 font-bold">
                {game?.metacritic}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Playtime</span>
              <span>{game?.playtime} Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
