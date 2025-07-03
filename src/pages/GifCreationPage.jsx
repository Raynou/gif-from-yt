import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GifForm from "../components/GifForm";
import VideoForm from "../components/VideoForm";
import FullScreenModal from "../components/FullScreenModal";

const GifCreationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="flex-1 flex flex-col gap-4 max-w-2xl mx-auto p-6 rounded-xl text-typo my-5 bg-secondary border border-typo ">
      <div className="flex flex-col items-center justify-center gap-5.5">
        {isLoading && <FullScreenModal />}
        <h2 className="text-xl font-semibold text-center">GIF Generator</h2>
        <VideoForm
          onSubmit={() => setIsLoading(true)}
          onSubmitSucess={(url) => {
            const id = url.split("?v=")[1];
            setIsLoading(false);
            navigate(`?v=${id}`, { replace: true });
          }}
          variant="small"
        />
        <GifForm />
      </div>
    </div>
  );
};

export default GifCreationPage;
