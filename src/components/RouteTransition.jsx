import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';

const RouteTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      
      // Show loader for a brief moment during route change
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        
        // Add a small delay before hiding loader for smoother transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  if (isTransitioning) {
    return <PageLoader />;
  }

  return (
    <div 
      className="animate-page-fade-in min-h-screen" 
      key={displayLocation.pathname}
      style={{
        animationDuration: '0.4s',
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

export default RouteTransition;