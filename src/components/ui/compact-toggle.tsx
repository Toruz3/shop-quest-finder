
import React from 'react';

interface CompactToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const CompactToggle: React.FC<CompactToggleProps> = ({ 
  checked, 
  onCheckedChange, 
  disabled = false 
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={`
        relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full 
        transition-colors duration-200 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1
        ${checked 
          ? 'bg-green-500' 
          : 'bg-gray-300'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-3 w-3 transform rounded-full 
          bg-white shadow-sm transition duration-200 ease-in-out
          translate-y-0.5
          ${checked ? 'translate-x-3.5' : 'translate-x-0.5'}
        `}
      />
    </button>
  );
};
