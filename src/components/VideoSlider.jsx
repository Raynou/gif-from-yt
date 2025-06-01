const VideoSlider = ({ videoDuration, videoRef, progress, setProgress }) => {
  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setProgress(time);
  };
  return (
    <>
      <input
        type="range"
        min="0"
        max={videoDuration}
        step="0.1"
        value={progress}
        onChange={handleSliderChange}
      />
    </>
  );
};

export default VideoSlider;
