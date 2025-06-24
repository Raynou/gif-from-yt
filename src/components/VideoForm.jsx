import { useState } from "react";

const VideoForm = ({
  onSubmit = () => {},
  onSubmitSucess = () => {},
  variant = "default",
}) => {
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

  const inputStyle =
    variant === "default" ? "w-full p-4 text-xl mb-4" : "mx-1 py-1 w-1/2";
  const buttonStyle =
    variant === "default" ? "w-full py-4 text-xl font-semibold" : "p-1";
  const divStyle = variant === "default" ? "" : "w-full flex justify-center";

  return (
    <>
      <div className={divStyle}>
        <input
          value={url}
          onChange={handleInput}
          type="text"
          className={`bg-secondary border border-typo rounded ${inputStyle}`}
        />
        <button
          onClick={getVideo}
          className={`bg-peach hover:contrast-105 hover:cursor-pointer rounded text-typo ${buttonStyle}`}
        >
          Get video
        </button>
      </div>
    </>
  );
};

export default VideoForm;
