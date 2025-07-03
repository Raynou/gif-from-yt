import { useState } from "react";

const VideoForm = ({
  onSubmit = () => {},
  onError = () => {},
  onSubmitSucess = () => {},
  variant = "default",
}) => {
  const [url, setUrl] = useState("");
  const [showErrorLabel, setShowErrorLabel] = useState(false);
  const handleInput = (e) => {
    setUrl(e.target.value);
  };
  const getVideo = async () => {
    onSubmit();
    const data = {
      url: url,
    };
    const res = await fetch("http://localhost:3000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      setShowErrorLabel(true);
      onError();
      return;
    }
    onSubmitSucess(url);
  };

  const inputStyle =
    variant === "default"
      ? "w-full p-4 text-xl mb-4"
      : "flex-[3] py-1 px-2 text-base border text-typo";
  const buttonStyle =
    variant === "default"
      ? "w-full py-4 text-xl font-semibold"
      : "p-1 flex-[1]";
  const divStyle =
    variant === "default" ? "" : "w-full flex justify-center gap-1";

  return (
    <div className={`flex flex-col ${variant !== "default" ? "w-full" : ""}`}>
      {showErrorLabel && <p className="text-red-400">Unable to find video</p>}
      <div className={divStyle}>
        <input
          value={url}
          onChange={handleInput}
          type="text"
          className={`bg-secondary border border-typo rounded ${inputStyle}`}
        />
        <button
          onClick={() => {
            if (url === "") return;
            getVideo();
          }}
          className={`bg-peach hover:contrast-105 hover:cursor-pointer rounded text-typo ${buttonStyle}`}
        >
          Get video
        </button>
      </div>
    </div>
  );
};

export default VideoForm;
