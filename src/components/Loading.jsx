import React from "react";
import { FaPaw, FaHeart } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bg-primary to-bg-surface relative overflow-hidden">
      {/* Enhanced background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-bg-primary" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/15 to-secondary-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-400/15 to-primary-400/15 rounded-full blur-3xl animate-pulse-slow-delayed" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/30 rounded-full animate-float-particle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="relative z-10 glass-primary rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-glass-lg text-center max-w-md mx-4 animate-fade-in-up">
        {/* Enhanced loading animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-secondary-500 animate-spin"></div>
          
          {/* Inner rotating ring */}
          <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-secondary-500 border-l-primary-500 animate-spin-reverse"></div>
          
          {/* Center paw icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 glass-secondary rounded-2xl flex items-center justify-center border border-white/20 dark:border-white/10 animate-bounce-gentle">
              <FaPaw className="text-2xl text-primary-600" />
            </div>
          </div>
          
          {/* Floating hearts */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-heart"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <FaHeart className="text-secondary-400 text-sm" />
            </div>
          ))}
        </div>

        {/* Enhanced loading text */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold gradient-text-primary mb-3 tracking-tight">
            Loading PawMart
          </h2>
          <p className="text-text-secondary font-medium mb-6">
            Preparing your pet-friendly experience...
          </p>
          
          {/* Enhanced animated dots */}
          <div className="flex justify-center items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-bounce-dot"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 w-full h-2 glass-tertiary rounded-full overflow-hidden border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-progress-loader" />
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="relative z-10 mt-8 flex items-center gap-4 glass-secondary px-6 py-3 rounded-2xl border border-white/20 dark:border-white/10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="animate-spin-slow">
          <FaPaw className="text-primary-500 text-lg" />
        </div>
        <span className="text-text-secondary font-medium text-sm">
          Finding the perfect pets for you...
        </span>
        <div className="animate-pulse-heart">
          <FaHeart className="text-secondary-500 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
