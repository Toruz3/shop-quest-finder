
import React from 'react';
import { Moon, Sun, Bell, BellOff } from 'lucide-react';

interface ModernToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
  label: string;
  description: string;
  icon?: 'theme' | 'notification';
}

const ModernToggle: React.FC<ModernToggleProps> = ({ 
  isEnabled, 
  onToggle, 
  label, 
  description,
  icon
}) => {
  const getIcon = () => {
    if (icon === 'theme') {
      return isEnabled ? (
        <Moon className="h-3 w-3 text-green-600" />
      ) : (
        <Sun className="h-3 w-3 text-gray-400" />
      );
    }
    
    if (icon === 'notification') {
      return isEnabled ? (
        <Bell className="h-3 w-3 text-green-600" />
      ) : (
        <BellOff className="h-3 w-3 text-gray-400" />
      );
    }
    
    return null;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-left">{label}</h4>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      
      <button
        onClick={onToggle}
        className={`
          relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          ${isEnabled 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-gray-200 hover:bg-gray-300'
          }
        `}
        role="switch"
        aria-checked={isEnabled}
        aria-label={`${isEnabled ? 'Disattiva' : 'Attiva'} ${label.toLowerCase()}`}
      >
        <span
          className={`
            inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out flex items-center justify-center
            ${isEnabled ? 'translate-x-7' : 'translate-x-1'}
          `}
        >
          {getIcon()}
        </span>
      </button>
    </div>
  );
};

export { ModernToggle };
