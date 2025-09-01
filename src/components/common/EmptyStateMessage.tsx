import empty from '@/assets/common/empty.svg';

interface EmptyStateMessageProps {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  subtitle?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  iconColor?: string;
}

const EmptyStateMessage = ({
  iconSrc = empty,
  iconAlt = '빈 상태',
  title,
  subtitle,
  iconSize = 'md',
  iconColor = 'brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
}: EmptyStateMessageProps) => {
  const iconSizeClasses = {
    sm: 'w-24 h-20',
    md: 'w-40 h-32',
    lg: 'w-48 h-40',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className={`${iconSizeClasses[iconSize]} flex items-center justify-center mb-6`}
      >
        <img
          src={iconSrc}
          alt={iconAlt}
          className="w-full h-full object-contain"
          style={{
            filter: iconColor,
          }}
        />
      </div>

      <div className="text-center space-y-2">
        <p className="text-2xl font-hana-bold text-line !mb-0">{title}</p>
        {subtitle && (
          <p className="text-2xl font-hana-bold text-line !mb-0">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default EmptyStateMessage;
