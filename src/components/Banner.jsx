import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import b1 from "../assets/1.png";
import b2 from "../assets/2.jpg";
import b3 from "../assets/3.png";

const slides = [
  {
    image: b1,
    heading: "Find Your Furry Friend Today!",
    subheading:
      "Discover adorable pets, trusted sellers, and loving new beginnings.",
  },
  {
    image: b2,
    heading: "Adopt, Don’t Shop — Give a Pet a Home.",
    subheading:
      "Every pet deserves a loving family. Start your adoption journey today!",
  },
  {
    image: b3,
    heading: "Because Every Pet Deserves Love and Care.",
    subheading: "Connect with local pets and products in your community.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden shadow-lg">
      {" "}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full"
        >
          <img
            src={slides[current].image}
            alt={`slide-${current}`}
            className="w-full h-full object-cover"
          />
          {/* Animated heading & subheading */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">
            <motion.h2
              key={slides[current].heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-white text-3xl md:text-5xl font-bold mb-4"
            >
              <Typewriter
                words={[slides[current].heading]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </motion.h2>

            <motion.p
              key={slides[current].subheading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-lg md:text-2xl max-w-2xl"
            >
              {slides[current].subheading}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Navigation Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
      {/* Left/Right Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Banner;
