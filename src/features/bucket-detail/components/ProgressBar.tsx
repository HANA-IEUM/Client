type ProgressBarProps = {
  percent: number;
};

const ProgressBar = ({ percent }: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="w-full flex items-center gap-3">
      <div className="relative flex-1 rounded-full bg-white h-2">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-icon-pink transition-all duration-300 ease-in-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="font-hana-regular text-sm text-white/90 select-none">
        {clamped}%
      </span>
    </div>
  );
};

export default ProgressBar;
