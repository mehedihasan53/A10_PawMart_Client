import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  fullWidth = false,
  icon,
  as: Component = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500 shadow-glass hover:shadow-glass-lg hover:-translate-y-1 active:translate-y-0 active:scale-95',
    
    secondary: 'glass-secondary text-light-text-primary dark:text-dark-text-primary hover:glass-primary focus:ring-primary-500 hover:-translate-y-1',
    
    glass: 'glass-button text-light-text-primary dark:text-dark-text-primary hover:text-primary-500 dark:hover:text-primary-400 focus:ring-primary-500',
    
    outline: 'bg-transparent border-2 border-primary-500/30 text-primary-500 hover:border-primary-500 hover:bg-primary-500/10 focus:ring-primary-500 dark:border-primary-400/30 dark:text-primary-400 dark:hover:border-primary-400 dark:hover:bg-primary-400/10',
    
    ghost: 'bg-transparent text-light-text-secondary dark:text-dark-text-secondary hover:glass-tertiary hover:text-primary-500 dark:hover:text-primary-400 focus:ring-primary-500',
    
    gradient: 'gradient-primary text-white hover:shadow-glow-primary focus:ring-primary-500 hover:-translate-y-1 active:translate-y-0 active:scale-95',
    
    danger: 'bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700 focus:ring-error-500 shadow-glass hover:shadow-glass-lg hover:-translate-y-1 active:translate-y-0 active:scale-95',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
    xl: 'px-10 py-5 text-xl gap-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    widthClass,
    className
  );
  
  const buttonProps = {
    className: buttonClasses,
    disabled: disabled || loading,
    ...(Component === 'button' && { onClick, type }),
    ...props
  };

  const ButtonElement = Component === motion.button || Component === 'button' ? motion.button : Component;
  
  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <ButtonElement
      {...buttonProps}
      {...(ButtonElement === motion.button ? motionProps : {})}
    >
      {/* Shimmer effect for glass variants */}
      {(variant === 'glass' || variant === 'secondary') && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      {/* Gradient overlay for primary variants */}
      {(variant === 'primary' || variant === 'gradient' || variant === 'danger') && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </div>
    </ButtonElement>
  );
};

export default Button;