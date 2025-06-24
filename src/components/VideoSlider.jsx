const VideoSlider = ({ videoDuration, videoRef, progress, setProgress }) => {
  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setProgress(time);
  };

  const formatTime = (time) => {
    if (time > 60) {
      const minutes = parseInt(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed(1)}`;
    }
    return `0:${time < 10 ? "0" : ""}${time
      .toFixed(1)
      .toString()
      .replace(".", ":")}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4 py-2">
      <input
        type="range"
        min="0"
        max={videoDuration}
        step="0.1"
        value={progress}
        onChange={handleSliderChange}
        className="w-full h-2 accent-primary rounded-lg cursor-pointer"
      />
      <div className="text-sm text-text-color font-mono w-14 text-right">
        {formatTime(progress)}
      </div>
    </div>
  );
};

export default VideoSlider;
