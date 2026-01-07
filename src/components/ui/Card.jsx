import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = ({
  children,
  className = '',
  variant = 'glass',
  padding = 'md',
  hover = true,
  onClick,
  animated = true,
  ...props
}) => {
  const baseClasses = 'rounded-3xl transition-all duration-500 relative overflow-hidden';
  
  const variants = {
    default: 'bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border shadow-glass dark:shadow-glass-dark',
    
    glass: 'glass-card',
    
    elevated: 'glass-primary shadow-glass-lg dark:shadow-glass-dark-lg',
    
    outlined: 'bg-transparent border-2 border-primary-500/20 dark:border-primary-400/20 hover:border-primary-500/40 dark:hover:border-primary-400/40',
    
    gradient: 'bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-950/50 dark:to-secondary-950/50 border border-primary-200/30 dark:border-primary-800/30 backdrop-blur-sm',
    
    solid: 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border',
    
    floating: 'glass-secondary shadow-glass-xl dark:shadow-glass-dark-xl border-2 border-white/20 dark:border-white/10',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const hoverClasses = hover ? 'hover:shadow-glass-lg dark:hover:shadow-glass-dark-lg hover:-translate-y-2 hover:scale-[1.02]' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const cardClasses = cn(
    baseClasses,
    variants[variant],
    paddings[padding],
    hoverClasses,
    clickableClasses,
    className
  );
  
  const CardComponent = animated ? motion.div : 'div';
  
  const motionProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: onClick ? { scale: 1.02, y: -8 } : hover ? { y: -8, scale: 1.02 } : {},
    whileTap: onClick ? { scale: 0.98 } : {},
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  } : {};
  
  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {/* Shimmer effect overlay */}
      {(variant === 'glass' || variant === 'elevated' || variant === 'floating') && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      )}
      
      {/* Top highlight line for glass variants */}
      {(variant === 'glass' || variant === 'elevated' || variant === 'floating') && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </CardComponent>
  );
};

export default Card;