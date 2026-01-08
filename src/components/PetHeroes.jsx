import React from "react";
import { motion } from "framer-motion";
import { FaPaw, FaQuoteLeft } from "react-icons/fa";
import Card from "./ui/Card";

const heroes = [
  {
    name: "Siam Rahman",
    role: "Adopted 12+ Rescued Pets",
    image:
      "https://imgcdn.stablediffusionweb.com/2025/1/19/7446a89d-4060-4eed-b51e-5b70d931ee2f.jpg",
    quote: "Every rescued pet deserves patience, love, and a warm home.",
  },
  {
    name: "Maya Chowdhury",
    role: "Street Animal Care Volunteer",
    image:
      "https://www.shutterstock.com/image-photo/side-view-friendly-new-female-600nw-2324044919.jpg",
    quote: "Caring for animals isn't charity — it's humanity.",
  },
  {
    name: "Arif Hossain",
    role: "Pet Shelter Organizer",
    image:
      "https://www.shutterstock.com/image-photo/male-veterinarian-pug-dog-on-260nw-2562563655.jpg",
    quote:
      "Saving one animal won't change the world, but for that animal, the world changes forever.",
  },
];

const PetHeroes = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-7 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-950/20 dark:to-secondary-950/20" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-200/20 dark:bg-secondary-800/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaPaw className="text-primary-500 text-4xl" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
              Meet Our Pet Heroes
            </h2>
          </div>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Inspiring stories from our community members who make a difference in pets' lives
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {heroes.map((hero, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card variant="glassmorphism" className="group text-center relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-primary-300 dark:text-primary-700 opacity-50">
                  <FaQuoteLeft className="text-2xl" />
                </div>

                {/* Hero Image */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative mx-auto w-28 h-28"
                  >
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-full h-full rounded-full object-cover border-4 border-primary-200 dark:border-primary-800 group-hover:border-primary-400 dark:group-hover:border-primary-600 transition-colors duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-60"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full opacity-40"
                  />
                </div>

                {/* Hero Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300">
                    {hero.name}
                  </h3>

                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-full">
                    <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                      {hero.role}
                    </p>
                  </div>

                  <blockquote className="text-text-secondary italic leading-relaxed text-sm px-2">
                    "{hero.quote}"
                  </blockquote>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PetHeroes;