import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { FaUser } from 'react-icons/fa';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
  onClick,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const baseClasses = cn(
    'relative rounded-xl overflow-hidden border-2 border-primary-500 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center transition-all duration-300',
    sizes[size],
    onClick && 'cursor-pointer hover:scale-105 hover:shadow-medium dark:hover:shadow-dark-medium',
    className
  );

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const showFallback = !src || imageError || imageLoading;

  const AvatarComponent = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  } : {};

  return (
    <AvatarComponent
      className={baseClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {/* Loading state */}
      {imageLoading && src && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
      )}
      
      {/* Image */}
      {src && !imageError && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            imageLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {/* Fallback */}
      {showFallback && (
        <div className="flex items-center justify-center w-full h-full text-primary-600 dark:text-primary-400">
          {fallback || <FaUser className={iconSizes[size]} />}
        </div>
      )}
      
      {/* Online indicator (optional) */}
      {props.online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-white dark:border-dark-bg rounded-full" />
      )}
    </AvatarComponent>
  );
};

export default Avatar;