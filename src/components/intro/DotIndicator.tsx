interface DotIndicatorProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export default function DotIndicator({
  total,
  current,
  onDotClick,
}: DotIndicatorProps) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`h-2 w-2 rounded-full transition-colors ${
            index === current ? 'bg-theme-primary' : 'bg-line-light'
          }`}
        />
      ))}
    </div>
  );
}
