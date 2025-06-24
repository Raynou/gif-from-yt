const VideoSlider = ({ videoDuration, videoRef, progress, setProgress }) => {
  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setProgress(time);
  };

  const formatTime = (time) => {
    if (time > 60) return `${parseInt(time / 60)}:${(time % 60).toFixed(1)}`;
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
    //     className="appearance-none w-full h-2 bg-peach rounded-lg
    // [&::-webkit-slider-thumb]:appearance-none
    // [&::-webkit-slider-thumb]:h-6
    // [&::-webkit-slider-thumb]:w-6
    // [&::-webkit-slider-thumb]:bg-orange-500
    // [&::-webkit-slider-thumb]:rounded-sm
    // [&::-webkit-slider-thumb]:cursor-pointer

    // [&::-moz-range-thumb]:appearance-none
    // [&::-moz-range-thumb]:h-6
    // [&::-moz-range-thumb]:w-6
    // [&::-moz-range-thumb]:bg-orange-500
    // [&::-moz-range-thumb]:rounded-sm
    // [&::-moz-range-thumb]:cursor-pointer"
      />
      <div className="text-sm text-text-color font-mono w-14 text-right">
        {formatTime(progress)}
      </div>
    </div>
  );
};

export default VideoSlider;
