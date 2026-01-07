import React from "react";
import { motion } from "framer-motion";
import { FaPaw, FaHeart, FaHome, FaMoneyBillWave } from "react-icons/fa";
import Card from "./ui/Card";

const WhyAdopt = () => {
  const reasons = [
    {
      icon: <FaPaw className="text-4xl" />,
      title: "Save a Life",
      desc: "Every adoption gives a homeless pet a warm and safe home.",
      color: "from-primary-500 to-primary-600",
      bgColor: "from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl" />,
      title: "Budget Friendly",
      desc: "Adoption is much cheaper than buying from pet stores or breeders.",
      color: "from-success-500 to-success-600",
      bgColor: "from-success-50 to-success-100 dark:from-success-950 dark:to-success-900",
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Ethical Choice",
      desc: "You support compassion and humane treatment of animals.",
      color: "from-error-500 to-error-600",
      bgColor: "from-error-50 to-error-100 dark:from-error-950 dark:to-error-900",
    },
    {
      icon: <FaHome className="text-4xl" />,
      title: "Reduce Stray Population",
      desc: "You help reduce the number of abandoned animals on the streets.",
      color: "from-secondary-500 to-secondary-600",
      bgColor: "from-secondary-50 to-secondary-100 dark:from-secondary-950 dark:to-secondary-900",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/40 via-transparent to-primary-50/40 dark:from-secondary-950/30 dark:to-primary-950/30" />
      <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 dark:from-primary-800/20 dark:to-secondary-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-48 h-48 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 dark:from-secondary-800/20 dark:to-primary-800/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent mb-4">
            Why Adopt from PawMart?
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg">
            Discover the meaningful impact you can make by choosing adoption over shopping
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card variant="glassmorphism" className="group text-center relative overflow-hidden h-full">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 mb-6"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    {item.icon}
                  </div>
                  
                  {/* Floating Particles */}
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                    className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r ${item.color} rounded-full opacity-60`}
                  />
                  <motion.div
                    animate={{ 
                      y: [0, 6, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3 + 1
                    }}
                    className={`absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r ${item.color} rounded-full opacity-40`}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-text-secondary leading-relaxed text-sm group-hover:text-text-primary transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                
                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <Card variant="glassmorphism" className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                >
                  500+
                </motion.div>
                <p className="text-text-secondary">Pets Adopted</p>
              </div>
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-3xl font-bold bg-gradient-to-r from-success-600 to-primary-600 bg-clip-text text-transparent"
                >
                  50+
                </motion.div>
                <p className="text-text-secondary">Happy Families</p>
              </div>
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-3xl font-bold bg-gradient-to-r from-secondary-600 to-error-600 bg-clip-text text-transparent"
                >
                  24/7
                </motion.div>
                <p className="text-text-secondary">Support Available</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAdopt;