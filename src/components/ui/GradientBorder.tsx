import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className = '',
  animate = true,
}) => {
  return (
    <div className={`gradient-border ${className}`} style={animate ? { animation: 'gradient-spin 3s linear infinite' } : {}}>
      <div className="gradient-border-inner">{children}</div>
    </div>
  );
};

export default GradientBorder;
