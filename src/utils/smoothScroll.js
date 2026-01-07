import Lenis from 'lenis';

let lenis;

export const initSmoothScroll = () => {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return lenis;
};

export const scrollTo = (target, options = {}) => {
    if (lenis) {
        lenis.scrollTo(target, {
            offset: 0,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            ...options
        });
    }
};

export const scrollToTop = () => {
    scrollTo(0);
};

export const destroySmoothScroll = () => {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
};

export const getSmoothScrollInstance = () => lenis;