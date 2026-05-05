import Genres from "./components/Genres";
import Search from "./components/Search";

const Games = () => {
  return (
    <div className="mt-24">
      <header className="flex w-full justify-between items-end ">
        <h1 className="text-5xl font-bold text-foreground">EXPLORE GAMES</h1>

        <Search />
      </header>
      <Genres />
    </div>
  );
};

export default Games;
