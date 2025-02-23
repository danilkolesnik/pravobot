
const ProgressBar = ({ progressIndex }) => {
    const totalSteps = 4;
    return (
      <div className="w-full flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-xl ${
              index < progressIndex ? 'bg-mainBlue' : 'bg-white'
            }`}
          ></div>
        ))}
      </div>
    );
};

export default ProgressBar;