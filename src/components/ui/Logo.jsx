import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';
import { cn } from '../../utils/cn';

const Logo = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  animated = true,
  variant = 'default',
  ...props 
}) => {
  const sizes = {
    sm: {
      icon: 'text-lg p-2',
      text: 'text-lg',
      subtitle: 'text-xs'
    },
    md: {
      icon: 'text-xl p-2.5',
      text: 'text-2xl',
      subtitle: 'text-xs'
    },
    lg: {
      icon: 'text-2xl p-3',
      text: 'text-3xl',
      subtitle: 'text-sm'
    }
  };

  const variants = {
    default: {
      iconBg: 'bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500',
      iconBorder: 'border-2 border-white/40 dark:border-orange-300/30',
      textGradient: 'bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 dark:from-orange-400 dark:via-orange-500 dark:to-pink-400'
    },
    navbar: {
      iconBg: 'bg-gradient-to-br from-orange-500 via-orange-600 to-pink-600',
      iconBorder: 'border-2 border-white/50 dark:border-orange-300/40',
      textGradient: 'bg-gradient-to-r from-orange-600 via-orange-700 to-pink-600 dark:from-orange-300 dark:via-orange-400 dark:to-pink-300'
    },
    footer: {
      iconBg: 'bg-gradient-to-br from-orange-600 via-orange-700 to-pink-700',
      iconBorder: 'border-2 border-white/60 dark:border-orange-300/50',
      textGradient: 'bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 dark:from-orange-400 dark:via-orange-500 dark:to-pink-400'
    }
  };

  const currentVariant = variants[variant];

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const LogoComponent = animated ? motion.div : 'div';
  const IconComponent = animated ? motion.div : 'div';

  return (
    <Link to="/" className={cn("flex items-center space-x-3 group", className)} {...props}>
      <LogoComponent
        variants={animated ? logoVariants : {}}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="relative"
      >
        {/* Icon container */}
        <div className="relative">
          {/* Main icon container */}
          <IconComponent
            variants={animated ? iconVariants : {}}
            className={cn(
              "relative rounded-xl transition-all duration-300 group-hover:scale-110",
              currentVariant.iconBg,
              currentVariant.iconBorder,
              sizes[size].icon
            )}
          >
            <FaPaw className="text-white relative z-10" />
            
            {/* Inner highlight for depth */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-lg pointer-events-none" />
          </IconComponent>
        </div>
      </LogoComponent>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold leading-tight transition-all duration-300 group-hover:scale-105",
            // Vibrant orange-to-pink gradient text - clean flat design
            currentVariant.textGradient,
            "bg-clip-text text-transparent",
            // Webkit text stroke for better definition with vibrant gradient colors
            "[-webkit-text-stroke:_0.5px_rgba(249,115,22,0.2)] dark:[-webkit-text-stroke:_0.5px_rgba(251,146,60,0.2)]",
            // Vibrant fallback solid color
            "text-orange-600 dark:text-orange-400",
            sizes[size].text
          )}>
            PawMart
          </h1>
          <p className={cn(
            "leading-tight font-medium transition-all duration-300",
            // Vibrant gradient for subtitle - clean flat design
            "bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400",
            "bg-clip-text text-transparent",
            // Ensure subtitle is always visible with vibrant colors
            "opacity-90 group-hover:opacity-100",
            // Vibrant fallback color
            "text-orange-500 dark:text-orange-400",
            sizes[size].subtitle
          )}>
            Pet Adoption & Supply
          </p>
        </div>
      )}
    </Link>
  );
};

export default Logo;