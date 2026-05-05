// const index = () => {
//   return <div>Creator page</div>;
// };

// import api from "../services/apiCreators"
import { useEffect, useState } from "react";
import { Link } from "react-router";

import api from "../../../services/apiCreators";
// export default index;
function Creators(){
const [creators,setCreators]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError]=useState("")

useEffect(()=>{
const fetchCreators=async()=>{
  try{
    setLoading(true);
    const res=await api.get("/creators")
    setCreators(res.data.results)

  }
  
  catch(err){
    setError("error  loading creators")
  }
  finally{
    setLoading(false)
  }
 
};

 fetchCreators()

},[])
if(loading) return <p>...Loading</p>
if(error) return <p>{error}</p>
  return(
    <div>
      <h1 > Creators</h1>
    <div>
      {creators.map((creator)=>(
        <div key={creator.id}>
          <img src={creator.image} alt={creator.name}/>
          <h3>{creator.name}</h3>
      </div>))}
          </div>

    </div>
  )
}
export default Creators;
