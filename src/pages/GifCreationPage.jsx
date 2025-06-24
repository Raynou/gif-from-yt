import { useState } from "react";
import GifForm from "../components/GifForm";
import VideoForm from "../components/VideoForm";
import FullScreenModal from "../components/FullScreenModal";

const GifCreation = () => {
  const [isLoading, setIsLoading] = useState(false);

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
            location.href = location.pathname.split("?")[0] + "?v=" + id;
          }}
          variant="small"
        />
        <GifForm />
      </div>
    </div>
  );
};

export default GifCreation;
