import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaEye,
  FaPaw,
} from "react-icons/fa";
import { motion } from "framer-motion";
import DynamicTitle from "../DynamicTitle";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaEye />,
      title: "Information We Collect",
      content:
        "We collect information that you provide directly to us, such as your name, email address, phone number, and location when you register for an account, apply for adoption, or contact our support team.",
    },
    {
      icon: <FaLock />,
      title: "How We Use Your Data",
      content:
        "Your data is used to facilitate the pet adoption process, verify identities, and improve our services. We do not sell your personal information to third parties for marketing purposes.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Data Protection",
      content:
        "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, though we strive for maximum safety.",
    },
    {
      icon: <FaUserSecret />,
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal data at any time. If you wish to exercise these rights, please contact our support team at pawmart@gmail.com.",
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
      <DynamicTitle title="Privacy Policy | PawMart" />

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
              <FaShieldAlt size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary uppercase">
              Privacy{" "}
              <span className="gradient-text-primary">
                Policy
              </span>
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              Last updated: January 2026. Your privacy and the safety of our
              community is our top priority.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 left-[-5%] text-primary-100 text-[300px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col md:flex-row gap-8 p-10 glass-primary border border-white/20 dark:border-white/10 rounded-3xl transition-all duration-300 hover:shadow-glass-lg hover:scale-[1.02]"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 glass-secondary rounded-2xl flex items-center justify-center text-2xl text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    {section.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-text-primary mb-4 uppercase tracking-tighter">
                    {section.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed text-lg font-medium">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cookies Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 p-10 glass-secondary rounded-3xl border-2 border-dashed border-primary-500/20"
          >
            <h3 className="text-xl font-black text-text-primary mb-4 uppercase tracking-widest">
              Cookies & Tracking
            </h3>
            <p className="text-text-secondary leading-relaxed font-medium text-lg">
              PawMart uses cookies to enhance your browsing experience and
              analyze site traffic. By using our platform, you consent to our
              use of cookies in accordance with this policy.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block glass-secondary rounded-full px-8 py-4 border border-white/20 dark:border-white/10">
              <p className="text-text-secondary font-bold uppercase text-sm tracking-[0.2em]">
                Questions? Email us at{" "}
                <span className="text-primary-600 ml-1">pawmart@gmail.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
