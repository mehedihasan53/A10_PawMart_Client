import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

/**
 * @returns {Object} Authentication state object
 */
export const useAuthState = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  
  const { user, loading, authInitialized } = context;
  
  return {
    user,
    loading,
    authInitialized,
    isAuthenticated: !!user && authInitialized,
    isLoading: loading || !authInitialized,
  };
};

export default useAuthState;