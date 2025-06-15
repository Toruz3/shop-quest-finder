
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('spinner-enhanced', sizeClasses[size], className)} />
  );
};

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className,
  variant = 'rectangular'
}) => {
  const variantClasses = {
    text: 'h-4 w-3/4',
    rectangular: 'h-12 w-full',
    circular: 'h-12 w-12 rounded-full'
  };

  return (
    <div 
      className={cn(
        'loading-skeleton',
        variantClasses[variant],
        className
      )}
    />
  );
};

interface ShimmerCardProps {
  lines?: number;
  showAvatar?: boolean;
  className?: string;
}

export const ShimmerCard: React.FC<ShimmerCardProps> = ({ 
  lines = 3, 
  showAvatar = false,
  className 
}) => {
  return (
    <div className={cn('p-4 space-y-3', className)}>
      <div className="flex items-center space-x-3">
        {showAvatar && (
          <LoadingSkeleton variant="circular" className="w-10 h-10" />
        )}
        <div className="space-y-2 flex-1">
          <LoadingSkeleton variant="text" className="h-4 w-3/4" />
          <LoadingSkeleton variant="text" className="h-3 w-1/2" />
        </div>
      </div>
      {Array.from({ length: lines }).map((_, index) => (
        <LoadingSkeleton 
          key={index}
          variant="text" 
          className={`h-3 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
};
