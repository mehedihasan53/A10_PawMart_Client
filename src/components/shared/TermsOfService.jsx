import React from "react";
import {
  FaFileContract,
  FaUserCheck,
  FaBan,
  FaBalanceScale,
  FaPaw,
} from "react-icons/fa";
import { motion } from "framer-motion";
import DynamicTitle from "../DynamicTitle";

const TermsOfService = () => {
  const terms = [
    {
      icon: <FaUserCheck />,
      title: "Acceptance of Terms",
      content:
        "By accessing and using the PawMart platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.",
    },
    {
      icon: <FaFileContract />,
      title: "Adoption Process",
      content:
        "All pet adoptions through PawMart are subject to a verification process. We reserve the right to approve or deny any adoption application based on our safety standards and the pet's well-being.",
    },
    {
      icon: <FaBan />,
      title: "Prohibited Activities",
      content:
        "Users are prohibited from providing false information, engaging in animal cruelty, or using the platform for any illegal animal trading. Violation of this will lead to an immediate ban.",
    },
    {
      icon: <FaBalanceScale />,
      title: "Limitation of Liability",
      content:
        "PawMart acts as a bridge between pets and adopters. While we verify information, we are not responsible for any issues arising after the adoption is finalized.",
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

  return (
    <div className="bg-gradient-to-br from-bg-primary to-bg-surface transition-colors duration-300 overflow-hidden">
      <DynamicTitle title="Terms of Service | PawMart" />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary-50/50 to-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 glass-primary text-primary-600 rounded-3xl mb-8 border border-white/20 dark:border-white/10">
              <FaFileContract size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary uppercase">
              Terms of{" "}
              <span className="gradient-text-primary">
                Service
              </span>
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              Please read these terms carefully before using our platform to
              ensure a safe community for our pets.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 right-[-5%] text-primary-100 text-[300px] rotate-[-15deg] opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8"
          >
            {terms.map((term, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-10 glass-primary border border-white/20 dark:border-white/10 rounded-3xl transition-all duration-300 hover:shadow-glass-lg hover:scale-[1.02]"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-14 h-14 glass-secondary rounded-2xl flex items-center justify-center text-2xl text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    {term.icon}
                  </div>
                  <h2 className="text-2xl font-black text-text-primary uppercase tracking-tighter">
                    <span className="text-primary-600 mr-2">{index + 1}.</span>
                    {term.title}
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed text-lg font-medium pl-2">
                  {term.content}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center border-t border-white/20 dark:border-white/10 pt-12"
          >
            <div className="inline-block glass-secondary px-8 py-4 rounded-full border border-white/20 dark:border-white/10">
              <p className="text-text-secondary font-bold text-sm uppercase tracking-widest">
                Last updated: January 2026 • Legal Inquiries:{" "}
                <span className="text-primary-600 ml-1">legal@pawmart.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
