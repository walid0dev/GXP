import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./routes/home/index.jsx";
import Games from "./routes/games/index.jsx";
import GameDetails from "./routes/game-details/index.jsx";
import Team from "./routes/team/index.jsx";
import Creator from "./routes/creator/index.jsx";
import Creators from "./routes/creators/index.jsx";
import MainLayout from "./routes/layout";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<Games />} />
        <Route path="games/:id" element={<GameDetails />} />
        <Route path="team" element={<Team />} />
        <Route path="creator" element={<Creator />} />
        <Route path="creators" element={<Creators />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
