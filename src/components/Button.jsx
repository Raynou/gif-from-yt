const Button = ({ title, action, width="" }) => {
  return (
    <button
      onClick={action}
      title={title}
      children={title}
      className={`px-2 py-1 bg-peach hover:contrast-105 rounded cursor-pointer ${width}`}
    />
  );
};

export default Button;
