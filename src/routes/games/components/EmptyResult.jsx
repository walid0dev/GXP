import { PiEmptyBold } from "react-icons/pi";
const EmptyResult = () => {
  return (
    <div>
      <PiEmptyBold className="fill-accent" size={44} />
      <h1 className="text-2xl">No results found for this search!</h1>
    </div>
  );
};

export default EmptyResult;
