import React from 'react';

interface FlowerSVGProps {
  type: string;
  color?: string;
  size?: number;
  className?: string;
  animate?: boolean;
}

export const FlowerSVG: React.FC<FlowerSVGProps> = ({
  type,
  color = '#F472B6',
  size = 64,
  className = '',
  animate = false,
}) => {
  const animClass = animate ? 'transition-all duration-500 hover:scale-110 hover:rotate-3' : '';

  switch (type) {
    case 'rose':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem & Leaves */}
          <path d="M50 55 Q52 75 50 95" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 75 Q35 70 30 60 Q45 62 50 75 Z" fill="#15803D" opacity="0.9" />
          <path d="M50 82 Q65 77 70 67 Q55 69 50 82 Z" fill="#166534" opacity="0.9" />
          
          {/* Rose Outer Petals */}
          <circle cx="50" cy="40" r="32" fill={color} opacity="0.3" />
          <path d="M25 40 C 25 15, 75 15, 75 40 C 75 62, 25 62, 25 40 Z" fill={color} opacity="0.6" />
          <path d="M30 35 C 30 20, 70 20, 70 35 C 70 52, 30 52, 30 35 Z" fill={color} />
          
          {/* Inner Swirl Petals */}
          <path d="M38 32 C 38 25, 62 25, 62 32 C 62 42, 38 42, 38 32 Z" fill="#FFF" opacity="0.3" />
          <path d="M42 30 Q50 20 58 30 Q50 42 42 30 Z" fill="#FFF" opacity="0.5" />
          <circle cx="50" cy="32" r="5" fill="#BE185D" />
        </svg>
      );

    case 'peony':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 50 Q48 75 50 95" stroke="#15803D" strokeWidth="4" />
          <path d="M50 70 Q30 65 25 55 Q40 58 50 70 Z" fill="#166534" />
          
          {/* Layered Peony petals */}
          <circle cx="50" cy="42" r="35" fill={color} opacity="0.4" />
          <circle cx="35" cy="40" r="20" fill={color} opacity="0.7" />
          <circle cx="65" cy="40" r="20" fill={color} opacity="0.7" />
          <circle cx="50" cy="28" r="22" fill={color} opacity="0.8" />
          <circle cx="50" cy="52" r="22" fill={color} opacity="0.8" />
          <circle cx="50" cy="40" r="16" fill="#FFF" opacity="0.4" />
          <circle cx="50" cy="40" r="8" fill="#F43F5E" />
        </svg>
      );

    case 'sunflower':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 50 L50 95" stroke="#15803D" strokeWidth="5" />
          <path d="M50 75 Q70 65 75 50 Q58 60 50 75 Z" fill="#166534" />
          
          {/* Sunflower Petals in Ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="20"
              rx="6"
              ry="20"
              fill={color}
              transform={`rotate(${angle} 50 45)`}
            />
          ))}
          <circle cx="50" cy="45" r="18" fill="#78350F" />
          <circle cx="50" cy="45" r="14" fill="#451A03" />
          {/* Seed pattern dots */}
          <circle cx="46" cy="42" r="1.5" fill="#FBBF24" opacity="0.8" />
          <circle cx="53" cy="44" r="1.5" fill="#FBBF24" opacity="0.8" />
          <circle cx="49" cy="48" r="1.5" fill="#FBBF24" opacity="0.8" />
        </svg>
      );

    case 'tulip':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 50 Q52 75 50 95" stroke="#15803D" strokeWidth="4" />
          <path d="M50 75 Q25 65 20 45 Q38 52 50 75 Z" fill="#166534" />
          
          {/* Tulip Cup */}
          <path
            d="M30 45 Q20 15 50 15 Q80 15 70 45 Q50 65 30 45 Z"
            fill={color}
          />
          <path
            d="M38 45 Q28 20 50 20 Q72 20 62 45 Q50 60 38 45 Z"
            fill="#FFF"
            opacity="0.25"
          />
          <path
            d="M45 42 Q38 25 50 25 Q62 25 55 42 Z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );

    case 'babysbreath':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Branching Stems */}
          <path d="M50 90 L50 50" stroke="#166534" strokeWidth="2.5" />
          <path d="M50 70 L30 40" stroke="#166534" strokeWidth="2" />
          <path d="M50 65 L70 35" stroke="#166534" strokeWidth="2" />
          <path d="M30 40 L20 20" stroke="#166534" strokeWidth="1.5" />
          <path d="M30 40 L40 22" stroke="#166534" strokeWidth="1.5" />
          <path d="M70 35 L60 18" stroke="#166534" strokeWidth="1.5" />
          <path d="M70 35 L82 22" stroke="#166534" strokeWidth="1.5" />
          
          {/* Tiny White Stars */}
          {[
            { x: 50, y: 50 },
            { x: 20, y: 20 },
            { x: 40, y: 22 },
            { x: 60, y: 18 },
            { x: 82, y: 22 },
            { x: 30, y: 30 },
            { x: 70, y: 28 },
            { x: 50, y: 35 },
            { x: 35, y: 12 },
            { x: 65, y: 10 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="5" fill="#FFFFFF" />
              <circle cx={pt.x} cy={pt.y} r="2" fill="#FEF08A" />
            </g>
          ))}
        </svg>
      );

    case 'hydrangea':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 55 L50 95" stroke="#15803D" strokeWidth="4" />
          
          {/* Cluster background */}
          <circle cx="50" cy="40" r="32" fill={color} opacity="0.3" />
          
          {/* Floret clusters */}
          {[
            { x: 50, y: 22 },
            { x: 35, y: 32 },
            { x: 65, y: 32 },
            { x: 30, y: 48 },
            { x: 70, y: 48 },
            { x: 50, y: 42 },
            { x: 42, y: 55 },
            { x: 58, y: 55 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="10" fill={color} opacity="0.85" />
              <circle cx={pt.x - 3} cy={pt.y - 3} r="4" fill="#EEF2FF" opacity="0.7" />
              <circle cx={pt.x} cy={pt.y} r="2" fill="#F472B6" />
            </g>
          ))}
        </svg>
      );

    case 'daisy':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 50 L50 95" stroke="#15803D" strokeWidth="3.5" />
          <path d="M50 72 Q32 62 25 45 Q40 52 50 72 Z" fill="#166534" />
          
          {/* White Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="24"
              rx="4.5"
              ry="18"
              fill="#FFFFFF"
              transform={`rotate(${angle} 50 45)`}
            />
          ))}
          <circle cx="50" cy="45" r="11" fill="#FACC15" />
          <circle cx="50" cy="45" r="8" fill="#EAB308" />
        </svg>
      );

    case 'lavender':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 15 L50 95" stroke="#15803D" strokeWidth="3" />
          
          {/* Stacked Lavender Buds */}
          {[20, 30, 40, 50, 60, 70].map((y, idx) => (
            <g key={idx}>
              <circle cx="43" cy={y} r="6" fill={color} />
              <circle cx="57" cy={y} r="6" fill={color} />
              <circle cx="50" cy={y - 3} r="5" fill="#C084FC" />
            </g>
          ))}
        </svg>
      );

    case 'orchid':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${animClass} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 50 Q55 75 50 95" stroke="#15803D" strokeWidth="3.5" />
          {/* Orchid Petal Wings */}
          <path d="M50 40 Q20 20 15 40 Q30 55 50 40 Z" fill={color} opacity="0.85" />
          <path d="M50 40 Q80 20 85 40 Q70 55 50 40 Z" fill={color} opacity="0.85" />
          <path d="M50 40 Q50 10 50 15 Q50 30 50 40 Z" fill={color} />
          {/* Lower Lip */}
          <path d="M50 40 C 35 65, 65 65, 50 40 Z" fill="#E11D48" />
          <circle cx="50" cy="40" r="4" fill="#FDE047" />
        </svg>
      );
  }
};
