import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPaw,
} from "react-icons/fa";
import { motion } from "framer-motion";
import DynamicTitle from "../DynamicTitle";

const Contact = () => {
  const contactInfo = [
    {
      title: "Email Us",
      value: "pawmart@gmail.com",
      icon: <FaEnvelope />,
    },
    {
      title: "Call Us",
      value: "+880 1976 522844",
      icon: <FaPhoneAlt />,
    },
    {
      title: "Our Office",
      value: "Savar, Dhaka, Bangladesh",
      icon: <FaMapMarkerAlt />,
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
      <DynamicTitle title="Contact Us | PawMart" />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary-50/50 to-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary uppercase">
              Get in <span className="gradient-text-primary">Touch</span>
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              Have questions about adoption or want to support our mission? Our
              team is ready to assist you.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 left-[-5%] text-primary-100 text-[300px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-black text-text-primary mb-6 uppercase tracking-tighter">
                  Contact <span className="text-primary-600">Information</span>
                </h2>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  We value your feedback and inquiries. Reach out to us through
                  any of the following channels, and we will get back to you
                  within 24 business hours.
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group flex items-center p-6 glass-secondary rounded-3xl border border-white/20 dark:border-white/10 hover:glass-primary hover:shadow-glass-lg transition-all duration-300"
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl glass-primary text-primary-600 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                        {info.icon}
                      </div>
                      <div className="ml-6">
                        <p className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-1">
                          {info.title}
                        </p>
                        <p className="text-xl font-bold text-text-primary">
                          {info.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Emergency Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group p-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl overflow-hidden"
              >
                <div className="absolute top-[-20%] right-[-10%] text-white/10 text-[150px] rotate-12">
                  <FaExclamationTriangle />
                </div>
                <div className="relative z-10 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                    <FaExclamationTriangle />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-xl uppercase tracking-tight mb-2">
                      Emergency Support?
                    </h3>
                    <p className="text-white/90 leading-relaxed font-medium">
                      For urgent animal rescue or medical emergencies, call our
                      24/7 hotline directly at <br />
                      <span className="text-2xl font-black block mt-2 text-white">
                        +880 1976 522844
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-primary p-8 md:p-12 rounded-3xl border border-white/20 dark:border-white/10"
            >
              <h3 className="text-2xl font-black text-text-primary mb-8 uppercase tracking-tighter">
                Send us a <span className="text-secondary-500">Message</span>
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-3 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 rounded-2xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-3 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-2xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-3 ml-1">
                    Subject
                  </label>
                  <select className="w-full px-6 py-4 rounded-2xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-bold cursor-pointer appearance-none">
                    <option>General Inquiry</option>
                    <option>Pet Adoption Information</option>
                    <option>Donation & Sponsorship</option>
                    <option>Volunteer Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-3 ml-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all resize-none font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] hover:shadow-glass-lg active:scale-[0.98] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
