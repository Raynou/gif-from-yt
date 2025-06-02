import { useState } from "react";

const VideoForm = ({ onSubmit = () => {}, onSubmitSucess = () => {}}) => {
  const [url, setUrl] = useState("");
  const handleInput = (e) => {
    setUrl(e.target.value);
  };
  const getVideo = async () => {
    onSubmit();
    const data = {
      url: url,
    };
    await fetch("http://localhost:3000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    onSubmitSucess(url);
  };

  return (
    <>
      <div>
        <input value={url} onChange={handleInput} type="text" />
        <button onClick={getVideo}>Get video</button>
      </div>
    </>
  );
};

export default VideoForm;
