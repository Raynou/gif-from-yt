import { useState, useRef } from "react";
import GifDurationSlider from "./GifDurationSlider";
import VideoSlider from "./VideoSlider";
import VideoPlaybackControls from "./VideoPlaybackControls";
import Button from "./Button";

const GifForm = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [gifDuration, setGifDuration] = useState(1.0);
  const [pause, setPause] = useState(false);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => setProgress(videoRef.current.currentTime || 0);

  const handleLoadedMetadata = () =>
    setDuration(videoRef.current.duration || 0);

  const getGif = (init, duration = "00:00:01") => {
    fetch("http://localhost:3000/gif", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ init, duration }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.gif";
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  const formatTimeAndDuration = () => {
    const minutes = Number.parseInt(progress / 60);
    const seconds = Number.parseInt(progress % 60);
    const ms = progress.toFixed(2).split(".")[1];
    const time = `00:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}.${ms}`;

    const [gifSeconds, gifMs] = gifDuration.toString().split(".");
    const duration = `00:00:${gifSeconds > 10 ? "" : "0"}${gifSeconds}${
      gifMs ? "." : ""
    }${gifMs || ""}`;

    return [time, duration];
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-typo w-full py-4 px-2">
        <GifDurationSlider
          gifDuration={gifDuration}
          setGifDuration={setGifDuration}
        />
        <Button title={"Preview"} action={() => {}} />
        <VideoSlider
          videoDuration={duration}
          videoRef={videoRef}
          progress={progress}
          setProgress={setProgress}
        />
        <VideoPlaybackControls
          progress={progress}
          setProgress={setProgress}
          videoRef={videoRef}
          pause={pause}
          setPause={setPause}
        />
      </div>
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full rounded-lg border border-typo"
        controls
        autoPlay
        src="http://localhost:3000/video"
      />

      <Button
        title={"🎞️ Create GIF"}
        action={() => {
          const [time, duration] = formatTimeAndDuration();
          getGif(time, duration);
        }}
        width={"w-full"}
      />
    </>
  );
};

export default GifForm;
