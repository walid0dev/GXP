import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full flex py-12 items-center justify-center">
      <PacmanLoader size={44} color="var(--primary)" />
    </div>
  );
};

export default Loading;
