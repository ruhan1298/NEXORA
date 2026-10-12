import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const iconSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  const iconSvg = (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconSize}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Hexagon shape */}
      <path
        d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        filter="url(#glow)"
      />
      {/* Interlocking N strokes */}
      <path
        d="M16 20L16 44L22 44L22 28L28 44L34 28L34 44L40 44L40 20L34 20L28 34L22 20L16 20Z"
        fill="url(#logoGradient)"
        filter="url(#glow)"
      />
      {/* Glowing node dot */}
      <circle cx="48" cy="16" r="4" fill="#00D4FF" filter="url(#glow)">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`flex items-center ${className}`}>{iconSvg}</div>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {iconSvg}
      <span
        className={`font-display font-bold tracking-wider text-gradient ${textSize}`}
        style={{ letterSpacing: '0.2em' }}
      >
        NEXORA
      </span>
    </div>
  );
};

export default Logo;
