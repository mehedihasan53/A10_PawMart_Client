import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/shared/ScrollToTop.jsx";
import { initSmoothScroll } from "./utils/smoothScroll.js";
import PageLoader from "./components/PageLoader.jsx";

const queryClient = new QueryClient();

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();
    
    // Simulate app initialization and ensure smooth loading
    const initializeApp = async () => {
      // Wait for critical resources to load
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve);
        }
      });
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsAppLoading(false);
        // Remove loading class from HTML to show content
        document.documentElement.classList.remove('loading');
        document.body.style.visibility = 'visible';
      }, 300);
    };

    initializeApp();
    
    // Cleanup on unmount
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  // Show page loader while app is initializing
  if (isAppLoading) {
    return <PageLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--color-bg-surface)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <div className="animate-page-fade-in">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
