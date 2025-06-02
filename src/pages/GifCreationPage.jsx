import { useState } from "react";
import GifForm from "../components/GifForm";
import VideoForm from "../components/VideoForm";
import FullScreenModal from "../components/FullScreenModal";

const GifCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && <FullScreenModal />}
      <VideoForm
        onSubmit={() => {
          setIsLoading(true);
        }}
        onSubmitSucess={(url) => {
          const id = url.split("?v=")[1];
          setIsLoading(false);
          location.href = location.pathname.split("?")[0] + "?v=" + id;
        }}
      />
      <GifForm />
    </>
  );
};

export default GifCreation;
