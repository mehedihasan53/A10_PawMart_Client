import { useState, useEffect } from 'react';

const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Handle initial page load
    const handleLoad = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 800);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Handle route changes (for SPA navigation)
  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return {
    isLoading,
    isInitialLoad,
    showLoader,
    hideLoader,
  };
};

export default usePageLoader;