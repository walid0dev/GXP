import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/apiCreators";

function CreatorDetails() {
  const { id } = useParams();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const res = await api.get(`/creators/${id}`);
      setCreator(res.data);
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to="/creators"
          className="inline-block mb-6 text-sm text-gray-400 hover:text-white"
        >
          ← Back to Creators
        </Link>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT CARD */}
          <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg text-center">

            <img
              src={creator.image || "https://via.placeholder.com/150"}
              alt={creator.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
            />

            <h1 className="text-xl font-bold uppercase">
              {creator.name}
            </h1>

            <p className="text-xs text-blue-400 uppercase mt-1">
              {creator.positions?.[0]?.name || "Director"}
            </p>

            {/* Stats */}
            <div className="flex justify-between mt-6 text-sm">
              <div>
                <p className="font-bold text-lg">
                  {creator.games_count || 0}
                </p>
                <p className="text-gray-400 text-xs">Games Created</p>
              </div>

              <div>
                <p className="font-bold text-lg">#1</p>
                <p className="text-gray-400 text-xs">Rank</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-6">

            {/* Overview */}
            <div className="bg-[#0f172a] rounded-2xl p-6">
              <h2 className="font-semibold mb-3 uppercase text-sm text-gray-300">
                Professional Overview
              </h2>

              <p className="text-gray-400 leading-relaxed text-sm">
                {creator.description ||
                  "No description available for this creator."}
              </p>
            </div>

            {/* Bottom cards */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Expertise */}
              <div className="bg-[#0f172a] rounded-2xl p-6">
                <h3 className="uppercase text-sm text-gray-300 mb-2">
                  Expertise
                </h3>

                <ul className="text-gray-400 text-sm list-disc ml-4">
                  <li>
                    {creator.positions?.[0]?.name || "Game Development"}
                  </li>
                </ul>
              </div>

              {/* Contribution */}
              <div className="bg-[#0f172a] rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                <span className="text-yellow-400 text-3xl mb-2">🏆</span>

                <h3 className="uppercase text-sm text-gray-300">
                  Industry Contribution
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Active in production through multiple generations of gaming software.
                </p>
              </div>

            </div>

            {/* Associated titles */}
            <div className="bg-[#0f172a] rounded-2xl p-6">
              <h3 className="uppercase text-sm text-gray-300 mb-2">
                Associated Titles
              </h3>

              <p className="text-gray-400 text-sm">
                This creator has contributed to various world-class productions in the industry.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CreatorDetails;