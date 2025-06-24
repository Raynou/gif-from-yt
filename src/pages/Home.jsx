import { useNavigate } from "react-router-dom";
import VideoForm from "../components/VideoForm";
import { useState } from "react";
import FullScreenModal from "../components/FullScreenModal";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex items-center justify-center py-8 px-4 flex-1">
      {isLoading && <FullScreenModal />}
      <VideoForm
        onSubmit={() => setIsLoading(true)}
        onSubmitSucess={(url) => {
          const id = url.split("?v=")[1];
          navigate("/gif?v=" + id);
        }}
      />
    </div>
  );
};

export default Home;
