import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  spotlight?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  spotlight = false,
  glow = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    if (spotlight && cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      return () => {
        cardRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [spotlight]);

  const cardClasses = `
    glass-card
    ${hover ? 'hover:border-white/20' : ''}
    ${glow ? 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''}
    ${spotlight ? 'spotlight-card' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const spotlightStyle = spotlight
    ? {
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties
    : {};

  return (
    <motion.div
      ref={cardRef}
      className={cardClasses}
      style={spotlightStyle}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.02 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
