import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaAward, FaBuilding, FaPaw } from "react-icons/fa";
import DynamicTitle from "../DynamicTitle";

const Partners = () => {
  const partnerCategories = [
    {
      title: "Strategic Partners",
      icon: <FaHandshake className="text-primary-600 text-4xl" />,
      description: "Organizations that help us scale our impact and reach.",
      logos: [
        { name: "Animal Welfare Trust", id: 1 },
        { name: "EcoSafe Foundation", id: 2 },
        { name: "Global Pet Care", id: 3 },
        { name: "Dhaka Vet Council", id: 4 },
      ],
    },
    {
      title: "Corporate Supporters",
      icon: <FaBuilding className="text-secondary-500 text-4xl" />,
      description: "Companies providing resources and financial support.",
      logos: [
        { name: "Tech For Good", id: 5 },
        { name: "Healthline Pets", id: 6 },
        { name: "Green Logistics", id: 7 },
        { name: "Secure Bank", id: 8 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-br from-bg-primary to-bg-surface transition-colors duration-300 overflow-hidden">
      <DynamicTitle title="Partners | PawMart" />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary-50/50 to-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block glass-secondary px-6 py-3 mb-8 text-xs font-black tracking-[0.2em] text-primary-600 uppercase rounded-full border border-white/20 dark:border-white/10">
              Our Network
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary uppercase">
              Meet Our{" "}
              <span className="gradient-text-primary">
                Key Partners
              </span>
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              Collaboration drives our mission. We work with global and local
              leaders to ensure every pet finds a home.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 right-[-5%] text-primary-100 text-[300px] rotate-[-15deg] opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {partnerCategories.map((category, idx) => (
            <div key={idx} className={idx !== 0 ? "mt-32" : ""}>
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col items-center mb-16 text-center"
              >
                <div className="mb-6 glass-primary p-6 rounded-3xl border border-white/20 dark:border-white/10">
                  {category.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-text-primary uppercase tracking-tighter">
                  {category.title}
                </h2>
                <p className="mt-4 text-lg text-text-secondary max-w-lg font-medium">
                  {category.description}
                </p>
              </motion.div>

              {/* Partner Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {category.logos.map((partner) => (
                  <motion.div
                    key={partner.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="group flex flex-col items-center justify-center p-10 glass-primary border border-white/20 dark:border-white/10 rounded-3xl transition-all duration-300 hover:shadow-glass-lg"
                  >
                    <div className="w-14 h-14 glass-secondary rounded-2xl mb-6 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <FaAward size={24} />
                    </div>
                    <span className="text-text-primary font-black text-center tracking-tight leading-tight uppercase text-sm">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center p-12 glass-primary rounded-3xl border border-white/20 dark:border-white/10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 glass-secondary text-primary-600 rounded-2xl mb-6">
              <FaHandshake size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-6 uppercase tracking-tighter">
              Become a Partner
            </h2>
            <p className="text-text-secondary mb-8 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Join our mission to create a world where every pet finds a loving home. 
              Together, we can make a greater impact in animal welfare.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-glass-lg hover:scale-105 transition-all active:scale-95">
                Partner With Us
              </button>
              <button className="w-full sm:w-auto glass-secondary border-2 border-white/20 dark:border-white/10 text-text-primary px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:glass-primary hover:scale-105 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
