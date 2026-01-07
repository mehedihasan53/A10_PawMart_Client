/**
 * Utility functions for managing page transitions and loading states
 */

export const showPageLoader = () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.remove('fade-out');
        loader.classList.add('fade-in');
    }
};

export const hidePageLoader = () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.remove('fade-in');
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
};

export const createPageLoader = () => {
    // Create a page loader element if it doesn't exist
    if (!document.getElementById('page-loader')) {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.className = 'fixed inset-0 z-[9999] bg-gradient-to-br from-bg-primary to-bg-surface flex items-center justify-center';
        loader.style.display = 'none';

        loader.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-text-secondary font-medium">Loading...</p>
      </div>
    `;

        document.body.appendChild(loader);
    }
};

export const initPageTransitions = () => {
    createPageLoader();

    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
        showPageLoader();
        setTimeout(hidePageLoader, 500);
    });

    // Handle programmatic navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
        showPageLoader();
        originalPushState.apply(history, args);
        setTimeout(hidePageLoader, 300);
    };

    history.replaceState = function (...args) {
        showPageLoader();
        originalReplaceState.apply(history, args);
        setTimeout(hidePageLoader, 300);
    };
};

export default {
    showPageLoader,
    hidePageLoader,
    createPageLoader,
    initPageTransitions,
};