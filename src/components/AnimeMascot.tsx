import React from 'react';

interface AnimeMascotProps {
  src: string;
  size?: number;
  className?: string;
  name?: string;
  role?: string;
}

export const AnimeMascot: React.FC<AnimeMascotProps> = ({
  src,
  size = 80,
  className = '',
  name,
  role = 'TaskTime Mascot'
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <img src={src} alt={role} width={size} height={size} className="rounded-full object-cover border-2 border-white shadow-md" />
      {name && (
        <span className="text-xs font-medium text-slate-700 mt-1 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200 shadow-xs">
          {name}
        </span>
      )}
    </div>
  );
};
