import empty from '@/assets/common/empty.svg';

interface EmptyStateMessageProps {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  subtitle?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  iconColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  subtitleFont?: 'regular' | 'bold';
}

const EmptyStateMessage = ({
  iconSrc = empty,
  iconAlt = '빈 상태',
  title,
  subtitle,
  iconSize = 'md',
  iconColor = 'brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
  titleColor = 'text-line',
  subtitleColor = 'text-line',
  subtitleFont = 'bold',
}: EmptyStateMessageProps) => {
  const iconSizeClasses = {
    sm: 'w-24 h-20',
    md: 'w-40 h-32',
    lg: 'w-48 h-40',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className={`${iconSizeClasses[iconSize]} mb-6 flex items-center justify-center`}
      >
        <img
          src={iconSrc}
          alt={iconAlt}
          className="h-full w-full object-contain"
          style={{
            filter: iconColor,
          }}
        />
      </div>

      <div className="space-y-2 text-center">
        <p className={`font-hana-bold !mb-0 text-2xl ${titleColor}`}>{title}</p>
        {subtitle && (
          <p
            className={`font-hana-${subtitleFont} !mb-0 text-2xl ${subtitleColor}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyStateMessage;
