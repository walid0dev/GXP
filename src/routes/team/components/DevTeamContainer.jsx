import { use, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack, IoPeople, IoTrophy } from "react-icons/io5";
import { useGameDevTeamStore } from "../store";
import Pagination from "./Pagination";

const DEFAULT_PAGE_SIZE = 12;

const DevTeamContainer = ({ getGameDevTeamPromise, gameId }) => {
  const team = use(getGameDevTeamPromise);
  const page = useGameDevTeamStore((state) => state.page);
  const setPaginationLinks = useGameDevTeamStore(
    (state) => state.setPaginationLinks,
  );

  useEffect(() => {
    setPaginationLinks({
      prevPage: team?.previous ?? null,
      nextPage: team?.next ?? null,
    });
  }, [team?.next, team?.previous, setPaginationLinks]);

  const developers = team?.results ?? [];

  const totalMembers = team?.count ?? developers.length;
  const pageSize = DEFAULT_PAGE_SIZE;
  const currentPage = page;
  const totalPages = Math.max(1, Math.ceil(totalMembers / pageSize));

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Link
          to={`/games/${gameId}`}
          className="group inline-flex items-center space-x-2 rounded-full border border-border bg-card px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <IoArrowBack className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Game</span>
        </Link>

        <div className="space-y-6 rounded-3xl border border-border bg-card/80 p-6 md:p-8">
          <div className="flex items-center space-x-4">
            <div className="rounded-2xl bg-primary/15 p-3">
              <IoPeople className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="px-2 text-4xl font-black tracking-tighter text-foreground italic uppercase">
                Development Team
              </h1>
              <p className="px-2 font-medium text-muted-foreground italic">
                The creative minds behind the experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-background px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Total Members
              </p>
              <p className="text-2xl font-black text-foreground">{totalMembers}</p>
            </div>
            <div className="rounded-xl border border-border bg-background px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Current Page
              </p>
              <p className="text-2xl font-black text-foreground">{currentPage}</p>
            </div>
            <div className="rounded-xl border border-border bg-background px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Total Pages
              </p>
              <p className="text-2xl font-black text-foreground">{totalPages}</p>
            </div>
          </div>
        </div>
      </div>

      {developers.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {developers.map((dev) => {
              const projectCount = dev.games_count ?? 0;
              return (
                <div
                  key={dev.id}
                  className="group flex flex-col items-center space-y-4 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/45"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted transition-colors group-hover:border-primary/45">
                    {dev.image ? (
                      <img
                        src={dev.image}
                        alt={dev.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <IoPeople className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                    )}
                  </div>

                  <div className="w-full space-y-2">
                    <Link to={`/creators/${dev.id}`} className="inline-block">
                      <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary italic uppercase">
                        {dev.name}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap justify-center gap-2">
                      {dev.positions?.length ? (
                        dev.positions.map((position) => (
                          <span
                            key={position.id}
                            className="rounded border border-border bg-secondary/60 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-secondary-foreground"
                          >
                            {position.name}
                          </span>
                        ))
                      ) : (
                        <span className="rounded border border-border bg-secondary/60 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-secondary-foreground">
                          Unassigned
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto flex w-full items-center justify-between border-t border-border pt-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <IoTrophy className="h-3 w-3" />
                      <span className="text-xs font-bold">{projectCount} Projects</span>
                    </div>
                    <Link
                      to={`/creators/${dev.id}`}
                      className="text-xs font-bold text-primary hover:underline italic uppercase"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination />
        </div>
      ) : (
        <div className="space-y-4 rounded-3xl border border-border bg-card py-20 text-center">
          <IoPeople className="mx-auto h-16 w-16 text-muted-foreground" />
          <p className="text-xl font-bold text-muted-foreground italic uppercase">
            Development team details unavailable
          </p>
          <p className="mx-auto max-w-xs text-muted-foreground">
            Development team details are currently unavailable in the database.
          </p>
        </div>
      )}
    </div>
  );
};

export default DevTeamContainer;
