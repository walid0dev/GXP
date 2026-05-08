// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
//  import "./home.css";

import { div } from "motion/react-client";

// export default function Home() {
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(
//       `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=6`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setGames(data.results);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="home">
//       {/* HERO */}
//       <section className="hero">
//         <h1>
//           Discover Your Next <span>Adventure</span>
//         </h1>
//         <p>
//           Explore a vast universe of gaming possibilities. From indie gems to AAA
//           masterpieces.
//         </p>

//         <div className="buttons">
//           <button onClick={() => navigate("/games")}>
//             Browse Games
//           </button>

//           <button
//             className="secondary"
//             onClick={() => navigate("/creators")}
//           >
//             Explore Creators
//           </button>
//         </div>
//       </section>

//       {/* TRENDING */}
//       <section className="trending">
//         <div className="trending-header">
//           <h2>🔥 Trending Games</h2>
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="games-grid">
//             {games.map((game) => (
//               <div
//                 key={game.id}
//                 className="card"
//                 onClick={() => navigate(`/games/${game.id}`)}
//               >
//                 <img
//                   src={game.background_image}
//                   alt={game.name}
//                 />

//                 <div className="card-content">
//                   <h3>{game.name}</h3>
//                   <p>⭐ {game.rating}</p>
//                   <small>{game.released}</small>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
import "./home.css";
import { useNavigate } from "react-router-dom";
import TrendingGame from "../games/components/TrendingGames.jsx";
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <h1>
          Discover Your Next <span className="adv">Adventure</span>
        </h1>
        <p>
          Explore a vast universe of gaming possibilities. From indie gems to
          AAA masterpieces.
        </p>

        <div className="buttons">
          <button onClick={() => navigate("/games")}>Browse Games</button>

          <button className="secondary" onClick={() => navigate("/creators")}>
            Explore Creators
          </button>
        </div>
      </section>
      <TrendingGame />
    </div>
  );
}
export default Home;
