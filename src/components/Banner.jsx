import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaPaw, FaHeart, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import b1 from "../assets/1.png";
import b2 from "../assets/2.jpg";
import b3 from "../assets/3.png";

const slides = [
  {
    image: b1,
    heading: "Find Your Furry Friend Today!",
    subheading: "Discover adorable pets, trusted sellers, and loving new beginnings.",
    cta: "Start Adopting",
    ctaLink: "/pets-supplies"
  },
  {
    image: b2,
    heading: "Adopt, Don't Shop — Give a Pet a Home.",
    subheading: "Every pet deserves a loving family. Start your adoption journey today!",
    cta: "Browse Pets",
    ctaLink: "/category-filtered-product/pets"
  },
  {
    image: b3,
    heading: "Because Every Pet Deserves Love and Care.",
    subheading: "Connect with local pets and products in your community.",
    cta: "Explore Now",
    ctaLink: "/pets-supplies"
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, current]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <div className="relative w-full min-h-screen md:h-[700px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-bg-primary to-bg-surface">
      {/* Enhanced background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-bg-primary dark:from-primary-950/30 dark:to-bg-primary" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/15 to-secondary-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-400/15 to-primary-400/15 rounded-full blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 flex flex-col min-h-screen pt-5">
        <div className="container mx-auto px-4 py-3">
          {/* Mobile Content Section */}
          <div className={`text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="inline-flex items-center px-4 py-2 glass-secondary rounded-full text-xs font-bold text-primary-600 border border-white/20 dark:border-white/10 shadow-glass-sm">
                <FaPaw className="mr-2 text-primary-500" />
                Welcome to PawMart
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="gradient-text-primary">
                {slides[current].heading}
              </span>
            </h1>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto font-medium animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {slides[current].subheading}
            </p>

            {/* Mobile Image Section */}
            <div className={`relative mb-8 animate-fade-in-up transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="relative glass-primary p-3 rounded-2xl border border-white/20 dark:border-white/10 shadow-glass-lg max-w-xs mx-auto">
                <img
                  src={slides[current].image}
                  alt={slides[current].heading}
                  className="w-full h-56 object-cover rounded-xl transition-all duration-500"
                />

                {/* Mobile decorative elements */}
                <div className="absolute -top-2 -right-2 glass-primary p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-glass animate-float">
                  <span className="text-base">🐾</span>
                </div>
                <div className="absolute -bottom-2 -left-2 glass-primary p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-glass animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-base">❤️</span>
                </div>
              </div>
            </div>

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-4 justify-center animate-fade-in-up mb-10" style={{ animationDelay: '0.8s' }}>
              <Link
                to={slides[current].ctaLink}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold text-base uppercase tracking-wide hover:shadow-glass-lg hover:scale-105 transition-all duration-300 active:scale-95"
              >
                {slides[current].cta}
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center justify-center px-8 py-4 glass-secondary border-2 border-white/20 dark:border-white/10 text-text-primary rounded-xl font-bold text-base uppercase tracking-wide hover:glass-primary hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
              {[
                { number: "1000+", label: "Happy Pets", icon: FaPaw },
                { number: "500+", label: "Families", icon: FaHeart },
                { number: "50+", label: "Partners", icon: FaPaw },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center glass-tertiary p-4 rounded-xl border border-white/10 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div className="text-primary-500 text-lg mb-2 flex justify-center">
                    <stat.icon />
                  </div>
                  <div className="text-xl font-black gradient-text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex absolute inset-0 items-center">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Desktop Content */}
          <div className={`text-center lg:text-left z-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="inline-flex items-center px-6 py-3 glass-secondary rounded-full text-sm font-bold text-primary-600 border border-white/20 dark:border-white/10 shadow-glass-sm">
                <FaPaw className="mr-2 text-primary-500" />
                Welcome to PawMart
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="gradient-text-primary">
                {slides[current].heading}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary mb-10 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {slides[current].subheading}
            </p>

            {/* Desktop Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up mb-16" style={{ animationDelay: '0.8s' }}>
              <Link
                to={slides[current].ctaLink}
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-bold text-lg uppercase tracking-wide hover:shadow-glass-lg hover:scale-105 transition-all duration-300 active:scale-95"
              >
                {slides[current].cta}
                <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center justify-center px-10 py-5 glass-secondary border-2 border-white/20 dark:border-white/10 text-text-primary rounded-2xl font-bold text-lg uppercase tracking-wide hover:glass-primary hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Desktop Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              {[
                { number: "1000+", label: "Happy Pets", icon: FaPaw },
                { number: "500+", label: "Families", icon: FaHeart },
                { number: "50+", label: "Partners", icon: FaPaw },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center glass-tertiary p-6 rounded-2xl border border-white/10 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div className="text-primary-500 text-2xl mb-3 flex justify-center">
                    <stat.icon />
                  </div>
                  <div className="text-3xl md:text-4xl font-black gradient-text-primary">
                    {stat.number}
                  </div>
                  <div className="text-base text-text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Image */}
          <div className={`relative animate-fade-in-right transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative glass-primary p-6 rounded-3xl border border-white/20 dark:border-white/10 shadow-glass-lg">
              <img
                src={slides[current].image}
                alt={slides[current].heading}
                className="w-full h-[400px] md:h-[480px] object-cover rounded-2xl transition-all duration-500"
              />

              {/* Desktop decorative elements */}
              <div className="absolute -top-4 -right-4 glass-primary p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-glass animate-float">
                <span className="text-3xl">🐾</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-primary p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-glass animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">❤️</span>
              </div>

              <div className="absolute top-1/4 -left-4 glass-secondary p-3 rounded-xl border border-white/20 dark:border-white/10 animate-bounce-gentle">
                <span className="text-2xl">🏠</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows - Desktop only */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="hidden lg:block absolute left-6 top-1/2 transform -translate-y-1/2 p-4 glass-primary rounded-2xl hover:shadow-glass-lg transition-all duration-300 group z-20 border border-white/20 dark:border-white/10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="text-primary-600 group-hover:scale-110 group-hover:-translate-x-1 transition-all" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="hidden lg:block absolute right-6 top-1/2 transform -translate-y-1/2 p-4 glass-primary rounded-2xl hover:shadow-glass-lg transition-all duration-300 group z-20 border border-white/20 dark:border-white/10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="text-primary-600 group-hover:scale-110 group-hover:translate-x-1 transition-all" />
      </button>

      {/* Slide indicators - Mobile only */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index
                ? 'bg-primary-500 w-6'
                : 'bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className={`h-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-glow-primary transition-all duration-300 ${isPlaying ? 'animate-progress-bar' : 'w-0'
            }`}
          key={`${current}-${isPlaying}`}
        />
      </div>
    </div>
  );
};

export default Banner;