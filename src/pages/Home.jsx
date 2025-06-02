import { useNavigate } from "react-router-dom";
import VideoForm from "../components/VideoForm";
import { useState } from "react";
import FullScreenModal from "../components/FullScreenModal";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && <FullScreenModal />}
      <VideoForm
        onSubmit={() => setIsLoading(true)}
        onSubmitSucess={(url) => {
          const id = url.split("?v=")[1];
          navigate("/gif?v=" + id);
        }}
      />
    </>
  );
};

export default Home;
