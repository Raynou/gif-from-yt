import { useNavigate } from "react-router-dom";
import VideoForm from "../components/VideoForm";

const Home = () => {
  let navigate = useNavigate();
  return (
    <VideoForm
      callback={() => {
        navigate("/gif");
      }}
    />
  );
};

export default Home;
