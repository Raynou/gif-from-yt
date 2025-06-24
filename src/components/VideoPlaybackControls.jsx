import Button from "./Button";

const VideoPlaybackControls = ({
  progress,
  setProgress,
  videoRef,
  pause,
  setPause,
}) => {
  const SECOND_VALUE = 1;
  const MS_VALUE = 0.1;

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

  const handleSkipForward = (value) => {
    if (!videoRef.current) return;
    const newTime = progress + value;
    videoRef.current.pause();
    setPause(true);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleRewind = (value = SECOND_VALUE) => {
    if (!videoRef.current) return;
    const newTime = progress - value;
    videoRef.current.pause();
    setPause(true);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-3xl">
      <Button
        title={"<<"}
        action={() => {
          handleRewind(SECOND_VALUE);
        }}
      />
      <Button
        title={"<"}
        action={() => {
          handleRewind(MS_VALUE);
        }}
      />
      <Button title={pause ? "PAUSE" : "PLAY"} action={handlePause} />
      <Button
        title={">"}
        action={() => {
          handleSkipForward(MS_VALUE);
        }}
      />
      <Button
        title={">>"}
        action={() => {
          handleSkipForward(SECOND_VALUE);
        }}
      />
    </div>
  );
};

export default VideoPlaybackControls;
