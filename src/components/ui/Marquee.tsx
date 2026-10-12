import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 30,
  pauseOnHover = true,
  className = '',
}) => {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''} ${className}`}
    >
      <div
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
