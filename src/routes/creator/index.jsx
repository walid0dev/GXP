// const index = () => {
//   return <div>Creator page</div>;
// };

// import api from "../services/apiCreators"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../../services/apiCreators";
// export default index;
function Creators(){
const [creators,setCreators]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError]=useState("")
const[page,setPage]=useState(1)
const [total, setTotal] = useState(0);
const totalPages = Math.ceil(total / 6);

useEffect(()=>{
const fetchCreators=async()=>{
  try{
    setLoading(true);
    const res=await api.get("/creators",{
      params:{
        page:page,
        page_size:6,
      }
    })
    setCreators(res.data.results)
    setTotal(res.data.count)
  }
  
  catch(err){
    setError("error  loading creators")
  }
  finally{
    setLoading(false)
  }
 
};

 fetchCreators()

},[page])
if(loading) return (  <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>)
if(error) return <p>{error}</p>
  return(
  <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

  {/* Header */}
  <div className="max-w-6xl mx-auto mb-10">
    <h1 className="text-3xl font-bold uppercase tracking-wide">
      Industry Creators
    </h1>
    <p className="text-gray-400 mt-2">
      Discover the legendary figures behind the world’s greatest games.
    </p>
  </div>

  {/* Cards */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

    {creators.map((creator) => (
      <div
        key={creator.id}
        className="bg-[#0f172a] rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition duration-300"
      >
        {/* Image */}
        <img
          src={creator.image || "https://via.placeholder.com/150"}
          alt={creator.name}
          className="w-24 h-24 mx-auto rounded-xl object-cover mb-4"
        />

        {/* Name */}
        <h2 className="font-semibold text-lg uppercase">
          {creator.name}
        </h2>

        {/* Role */}
        <p className="text-xs text-gray-400 uppercase mt-1">
          {creator.positions?.[0]?.name || "Developer"}
        </p>

        {/* Stats */}
        <div className="flex justify-between mt-6 text-sm text-gray-300">
          <div>
            <p className="text-blue-400 font-bold">
              {creator.games_count || 0}
            </p>
            <p className="text-xs text-gray-500">Games</p>
          </div>

          <div>
            <p className="text-blue-400 font-bold">
              {creator.positions?.[0]?.name || "-"}
            </p>
            <p className="text-xs text-gray-500">Role</p>
          </div>
        </div>
      <Link to={`/creators/${creator.id}`}
      state={{ creator }}>
        {/* Button */}
        <button className="mt-6 w-full bg-[#1e293b] hover:bg-[#334155] text-sm py-2 rounded-lg transition">
          View Profile
        </button> </Link>
      </div>
    ))}

  </div>

  {/* Pagination */}
  <div className="flex justify-center items-center gap-4 mt-10">

  {/* Previous */}
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className={`px-4 py-2 rounded-lg ${
      page === 1
        ? "bg-gray-700 cursor-not-allowed"
        : "bg-[#0f172a] hover:bg-[#1e293b]"
    }`}
  >
    ◀
  </button>

  <span className="text-gray-400">
    Page {page} 
  </span>

  {/* Next */}
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    className={`px-4 py-2 rounded-lg ${
      page === totalPages
        ? "bg-gray-700 cursor-not-allowed"
        : "bg-[#0f172a] hover:bg-[#1e293b]"
    }`}
  >
    ▶
  </button>

</div>
</div>
  )
}
export default Creators;
