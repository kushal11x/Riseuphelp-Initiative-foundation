import React from 'react';

interface GaugeProps {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: number;
  max?: number;
  labelLeft?: string;
  labelRight?: string;
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  color = '#084c36',
  showLabels = false,
  min = 0,
  max = 100,
  labelLeft,
  labelRight,
  className = '',
}) => {
  // 40 tick marks spanning a 180° arc from angle π to 2π
  const totalTicks = 40;
  const clampedValue = Math.min(Math.max(value, min), max);
  const normalizedValue = ((clampedValue - min) / (max - min)) * 100;
  const activeCount = Math.round((normalizedValue / 100) * totalTicks);

  const centerX = 100;
  const centerY = 100;
  const outerRadius = 80;
  const innerRadius = 70; // (r - 10)

  const ticks = Array.from({ length: totalTicks }, (_, index) => {
    // start at angle π (left) and sweep to 2π (right)
    const angle = Math.PI + (index * Math.PI) / (totalTicks - 1);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const x1 = centerX + innerRadius * cosA;
    const y1 = centerY + innerRadius * sinA;
    const x2 = centerX + outerRadius * cosA;
    const y2 = centerY + outerRadius * sinA;

    const isActive = index < activeCount;
    const strokeColor = isActive ? color : '#d4d4d8';

    return (
      <line
        key={index}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        className="transition-colors duration-500"
      />
    );
  });

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 120"
        className="w-full max-w-[260px] overflow-visible"
        aria-label={`Gauge indicator at ${value} percent`}
      >
        {/* Subtle background guide arc */}
        <path
          d="M 25 100 A 75 75 0 0 1 175 100"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />

        {/* 40 Ticks Arc */}
        {ticks}

        {/* Center Percentage Display */}
        <text
          x={centerX}
          y={105}
          textAnchor="middle"
          fontSize="22"
          fontWeight="600"
          fill="#111827"
          className="select-none tracking-tight font-sans"
        >
          {clampedValue}%
        </text>
      </svg>

      {/* Optional End Labels */}
      {showLabels && (labelLeft || labelRight) && (
        <div className="w-full max-w-[240px] flex items-center justify-between text-[11px] font-medium text-neutral-500 -mt-1 px-1">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
    </div>
  );
};
