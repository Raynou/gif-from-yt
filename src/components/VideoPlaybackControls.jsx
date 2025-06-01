const VideoPlaybackControls = ({
  progress,
  setProgress,
  videoRef,
  pause,
  setPause,
}) => {
  const handlePause = () => {
    if (!videoRef.current) return;
    if (!pause) {
      videoRef.current.pause();
      setPause(true);
    } else {
      videoRef.current.play();
      setPause(false);
    }
  };

  const handleSkipForwardSecond = () => {
    const newTime = progress + 1;
    if (!videoRef.current) return;
    if (!pause) {
      videoRef.current.pause();
      setPause(true);
    }
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleSkipForwardMs = () => {
    const newTime = progress + 0.1;
    if (!videoRef.current) return;
    if (!pause) {
      videoRef.current.pause();
      setPause(true);
    }
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleRewindSecond = () => {
    const newTime = progress - 1;
    if (!videoRef.current) return;
    if (!pause) {
      videoRef.current.pause();
      setPause(true);
    }
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleRewindMs = () => {
    const newTime = progress - 0.1;
    if (!videoRef.current) return;
    if (!pause) {
      videoRef.current.pause();
      setPause(true);
    }
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <>
      <button onClick={handleRewindSecond}>{"<<"}</button>
      <button onClick={handleRewindMs}>{"<"}</button>
      <button onClick={handlePause}>PLAY</button>
      <button onClick={handleSkipForwardMs}>{">"}</button>
      <button onClick={handleSkipForwardSecond}>{">>"}</button>
    </>
  );
};

export default VideoPlaybackControls;
