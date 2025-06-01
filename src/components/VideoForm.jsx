import { useState } from "react";

const VideoForm = ({ callback = () => {} }) => {
  const [url, setUrl] = useState("");
  const handleInput = (e) => {
    setUrl(e.target.value);
  };
  const getVideo = async () => {
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
    callback();
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
