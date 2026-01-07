import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation utilities
export const fadeInUp = (element, delay = 0) => {
    return gsap.fromTo(element,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: "power2.out"
        }
    );
};

export const fadeInLeft = (element, delay = 0) => {
    return gsap.fromTo(element,
        {
            x: -50,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: "power2.out"
        }
    );
};

export const fadeInRight = (element, delay = 0) => {
    return gsap.fromTo(element,
        {
            x: 50,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: "power2.out"
        }
    );
};

export const scaleIn = (element, delay = 0) => {
    return gsap.fromTo(element,
        {
            scale: 0.8,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay,
            ease: "back.out(1.7)"
        }
    );
};

export const staggerAnimation = (elements, animation = fadeInUp, stagger = 0.1) => {
    elements.forEach((element, index) => {
        animation(element, index * stagger);
    });
};

// Scroll-triggered animations
export const animateOnScroll = (element, animation, trigger = "top 80%") => {
    ScrollTrigger.create({
        trigger: element,
        start: trigger,
        onEnter: () => animation(element),
        once: true
    });
};

// Parallax effect
export const createParallax = (element, speed = 0.5) => {
    gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
};

// Hover animations
export const hoverScale = (element, scale = 1.05) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
        scale,
        duration: 0.3,
        ease: "power2.out"
    });

    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());

    return tl;
};

// Loading animations
export const createLoadingAnimation = (element) => {
    return gsap.to(element, {
        rotation: 360,
        duration: 1,
        ease: "none",
        repeat: -1
    });
};

// Page transition animations
export const pageTransitionIn = (element) => {
    return gsap.fromTo(element,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }
    );
};

export const pageTransitionOut = (element) => {
    return gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
    });
};

// Utility to clean up animations
export const killAnimations = (element) => {
    gsap.killTweensOf(element);
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
            trigger.kill();
        }
    });
};