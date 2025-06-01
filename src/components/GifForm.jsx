import { useState, useRef } from "react";
import GifDurationSlider from "./GifDurationSlider";
import VideoSlider from "./VideoSlider";
import VideoPlaybackControls from "./VideoPlaybackControls";
import VideoForm from "./VideoForm";

const GifForm = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [gifDuration, setGifDuration] = useState(1.0);
  const [pause, setPause] = useState(false);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => setProgress(videoRef.current.currentTime || 0);
  const handleLoadedMetadata = () =>
    setDuration(videoRef.current.duration || 0);
  const formatTime = (time) => {
    if (time > 60) return `${parseInt(time / 60)}:${(time % 60).toFixed(1)}`;
    return `0:${time < 10 ? "0" : ""}${time
      .toFixed(1)
      .toString()
      .replace(".", ":")}`;
  };
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

  return (
    <>
      <VideoForm
        callback={() => {
          location.reload();
        }}
      />
      <div>{formatTime(progress)}</div>
      <VideoPlaybackControls
        progress={progress}
        setProgress={setProgress}
        videoRef={videoRef}
        pause={pause}
        setPause={setPause}
      />
      <GifDurationSlider
        gifDuration={gifDuration}
        setGifDuration={setGifDuration}
      />
      <VideoSlider
        videoDuration={duration}
        videoRef={videoRef}
        progress={progress}
        setProgress={setProgress}
      />
      <video
        ref={videoRef}
        width="320"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls
        autoPlay
        src="http://localhost:3000/video"
      />
      <button
        onClick={() => {
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
          getGif(time, duration);
        }}
      >
        Create GIF
      </button>
    </>
  );
};

export default GifForm;
