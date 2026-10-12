import React from 'react';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`aurora-bg min-h-screen relative ${className}`}>
      <div className="noise-bg absolute inset-0 pointer-events-none" />
      <div className="vignette" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;
