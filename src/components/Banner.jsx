import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaPaw, FaHeart, FaArrowRight } from "react-icons/fa";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, current]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };
  
  const goToSlide = (index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-bg-primary to-bg-surface">
      {/* Enhanced background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-bg-primary" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/15 to-secondary-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-400/15 to-primary-400/15 rounded-full blur-3xl animate-pulse-slow-delayed" />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left z-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="inline-flex items-center px-6 py-3 glass-secondary rounded-full text-sm font-bold text-primary-600 border border-white/20 dark:border-white/10 shadow-glass-sm">
                <FaPaw className="mr-2 text-primary-500" />
                Welcome to PawMart
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="gradient-text-primary">
                {slides[current].heading}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {slides[current].subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Link
                to={slides[current].ctaLink}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-bold uppercase tracking-wide hover:shadow-glass-lg hover:scale-105 transition-all duration-300 active:scale-95"
              >
                {slides[current].cta}
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center justify-center px-8 py-4 glass-secondary border-2 border-white/20 dark:border-white/10 text-text-primary rounded-2xl font-bold uppercase tracking-wide hover:glass-primary hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              {[
                { number: "1000+", label: "Happy Pets", icon: FaPaw },
                { number: "500+", label: "Families", icon: FaHeart },
                { number: "50+", label: "Partners", icon: FaPaw },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center glass-tertiary p-4 rounded-2xl border border-white/10 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div className="text-primary-500 text-xl mb-2 flex justify-center">
                    <stat.icon />
                  </div>
                  <div className="text-2xl md:text-3xl font-black gradient-text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`relative animate-fade-in-right transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative glass-primary p-6 rounded-3xl border border-white/20 dark:border-white/10 shadow-glass-lg">
              <img
                src={slides[current].image}
                alt={slides[current].heading}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl transition-all duration-500"
              />
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 glass-primary p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-glass animate-float">
                <span className="text-3xl">🐾</span>
              </div>
              <div className="absolute -bottom-6 -left-6 glass-primary p-4 rounded-2xl border border-white/20 dark:border-white/10 shadow-glass animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">❤️</span>
              </div>
              
              {/* Additional decorative element */}
              <div className="absolute top-1/4 -left-4 glass-secondary p-3 rounded-xl border border-white/20 dark:border-white/10 animate-bounce-gentle">
                <span className="text-2xl">🏠</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 glass-primary rounded-2xl hover:shadow-glass-lg transition-all duration-300 group z-20 border border-white/20 dark:border-white/10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="text-primary-600 group-hover:scale-110 group-hover:-translate-x-1 transition-all" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 glass-primary rounded-2xl hover:shadow-glass-lg transition-all duration-300 group z-20 border border-white/20 dark:border-white/10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="text-primary-600 group-hover:scale-110 group-hover:translate-x-1 transition-all" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className={`h-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-glow-primary transition-all duration-300 ${
            isPlaying ? 'animate-progress-bar' : 'w-0'
          }`}
          key={`${current}-${isPlaying}`}
        />
      </div>
    </div>
  );
};

export default Banner;