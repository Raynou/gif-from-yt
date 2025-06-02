const GifDurationSlider = ({ gifDuration, setGifDuration, progress }) => {
  const handleChange = (e) => {
    const newDuration = parseFloat(e.target.value);
    setGifDuration(newDuration);
  };
  const handleInput = (e) => {
    const input = parseFloat(e.target.value);
    if (input >= 10) {
      e.target.value = parseInt(input / 10);
    }
    const [integer, decimals] = input.toString().split(".");
    if (decimals && decimals.length >= 2) {
      const number = `${integer}.${decimals.split("").shift()}`;
      e.target.value = parseFloat(number);
    }
    setGifDuration(parseFloat(e.target.value));
  };
  const formatTime = (time) => {
    if (time > 60) return `${parseInt(time / 60)}:${(time % 60).toFixed(1)}`;
    return `0:${time < 10 ? "0" : ""}${time
      .toFixed(1)
      .toString()
      .replace(".", ":")}`;
  };
  return (
    <>
      <div>{formatTime(progress)}</div>
      <input
        type="range"
        min="0.1"
        max="10.0"
        step="0.1"
        value={gifDuration}
        onChange={handleChange}
      />
      <input type="number" value={gifDuration} onInput={handleInput} />
    </>
  );
};

export default GifDurationSlider;
