// const index = () => {
//   return <div>Creators</div>;
// };

// export default index;
import { useState,useEffect } from "react";
import { useParams } from "react-router";

import api from "../../../services/apiCreators";

function CreatorDetails(){
  const {id}=useParams();
  const[creator,setCreator]=useState(null)
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState("")

  useEffect(()=>{
    const fetchCreators=async()=>{
      try{
        setLoading(true)
        const res=await api.get(`/creators/${id}`)
        setCreator(res.data)

      }
      catch(err){
        setError("error loading creator details")
      }
      finally{
        setLoading(false)
      }
    }
fetchCreators();
  },[id])
if (loading) return <p>Loading creator...</p>;
if (error) return <p>{error}</p>;
if (!creator) return <p>No data found</p>;
  return(
  
  <div>
  <h1>{creator.name}</h1>


<img src={creator.image} alt={creator.name} />
<p>{creator.description}</p>
<div>
<h3>Games</h3>
{creator.games?.map((game) => (
  <div key={game.id}>
    {game.name}
  </div>
))}</div>

  </div>)
}

export default CreatorDetails;