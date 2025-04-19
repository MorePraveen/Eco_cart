
import React from 'react';

interface EcoRatingBadgeProps {
  rating: 'A' | 'B' | 'C' | 'D' | 'F';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const EcoRatingBadge: React.FC<EcoRatingBadgeProps> = ({ 
  rating, 
  size = 'md',
  showLabel = false
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'bg-eco-green text-white';
      case 'B': return 'bg-eco-light-green text-white';
      case 'C': return 'bg-eco-leaf text-black';
      case 'D': return 'bg-amber-400 text-black';
      case 'F': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };
  
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'text-xs px-1.5 py-0.5';
      case 'md': return 'text-sm px-2.5 py-1';
      case 'lg': return 'text-base px-3 py-1.5';
      default: return 'text-sm px-2.5 py-1';
    }
  };

  const ratingDescriptions = {
    'A': 'Excellent sustainability',
    'B': 'Good sustainability',
    'C': 'Average sustainability',
    'D': 'Below average sustainability',
    'F': 'Poor sustainability'
  };

  return (
    <div className="inline-flex flex-col items-center">
      <span 
        className={`
          inline-flex items-center justify-center 
          rounded-full font-semibold ${getSizeClasses(size)} ${getRatingColor(rating)}
        `}
      >
        {rating}
      </span>
      {showLabel && (
        <span className="text-xs text-muted-foreground mt-1">
          {ratingDescriptions[rating]}
        </span>
      )}
    </div>
  );
};

export default EcoRatingBadge;
