const GifDurationSlider = ({ gifDuration, setGifDuration }) => {
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

  return (
    <div className="flex flex-col gap-2 w-full px-4 py-2 text-typo rounded-lg">
      <div className="flex items-center gap-3">
        <label className="text-sm font-mono">Duration:</label>
        <input
          type="number"
          value={gifDuration}
          onInput={handleInput}
          step="0.1"
          min="0.1"
          max="10.0"
          className="w-24 text-sm px-2 py-1 rounded focus:outline-none border border-typo"
        />
        <span className="text-xs">sec</span>
      </div>
      <input
        type="range"
        min="0.1"
        max="10.0"
        step="0.1"
        value={gifDuration}
        onChange={handleChange}
        className="w-full h-2 accent-primary rounded-lg cursor-pointer"
      />
    </div>
  );
};

export default GifDurationSlider;
