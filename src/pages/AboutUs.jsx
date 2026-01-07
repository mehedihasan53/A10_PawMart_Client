import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaHeart, FaUsers, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import DynamicTitle from "../components/DynamicTitle";

const AboutUs = () => {
  const stats = [
    { label: "Pets Adopted", value: "12,000+", icon: <FaPaw /> },
    { label: "Active Volunteers", value: "450+", icon: <FaUsers /> },
    { label: "Partner Shelters", value: "85+", icon: <FaShieldAlt /> },
    { label: "Cities Covered", value: "30+", icon: <FaHeart /> },
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
      <DynamicTitle title="About Us | PawMart" />

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
              Building a better{" "}
              <span className="gradient-text-primary">
                world for every pet.
              </span>
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              PawMart is a mission-driven organization dedicated to connecting
              abandoned pets with loving homes through technology, transparency,
              and community action.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 right-[-5%] text-primary-100 text-[300px] -rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-primary p-8 rounded-3xl border border-white/20 dark:border-white/10 text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-glass-lg"
              >
                <div className="text-primary-500 text-2xl flex justify-center mb-4">
                  {item.icon}
                </div>
                <p className="text-3xl md:text-4xl font-black text-text-primary">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl"></div>
              <h2 className="text-4xl font-black text-text-primary mb-8 uppercase tracking-tighter">
                Our Mission <span className="text-primary-600">&</span> Vision
              </h2>
              <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                <p>
                  Founded in 2023, PawMart was born out of a simple observation:
                  thousands of pets need homes and thousands of families are
                  ready to love them, but the connection was broken.
                </p>
                <div className="glass-secondary p-6 rounded-2xl border-l-4 border-primary-500">
                  <p className="italic font-medium text-text-primary">
                    "We believe that every animal deserves a second chance at life
                    and a first-class home."
                  </p>
                </div>
                <p>
                  We focus on transparency, animal safety, and responsible
                  ownership. Our platform ensures that every adoption process is
                  verified and every pet's health history is documented.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500 opacity-90"></div>
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-glass-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Our Team Working"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gradient-to-b from-bg-surface/50 to-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-text-primary uppercase tracking-tighter">
              Our Core <span className="text-secondary-500">Values</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary-500 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Empathy First",
                icon: <FaHeart />,
                desc: "We prioritize the well-being and emotional health of animals in every decision we make.",
              },
              {
                title: "Transparency",
                icon: <FaShieldAlt />,
                desc: "Full disclosure of pet health and background to ensure long-term adoption success.",
              },
              {
                title: "Community",
                icon: <FaUsers />,
                desc: "Building a network of volunteers and vets to provide a 360-degree support system.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group glass-primary p-10 rounded-3xl border border-white/20 dark:border-white/10 hover:shadow-glass-lg hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 glass-secondary text-primary-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block p-3 px-6 rounded-full glass-secondary border border-primary-500/20 text-primary-600 font-bold text-sm mb-6 uppercase tracking-widest">
              Join the movement
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-10 uppercase tracking-tighter">
              Ready to make a <span className="text-primary-600">Difference?</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-glass-lg hover:scale-105 transition-all active:scale-95"
                to={"/contact"}
              >
                Contact Support
              </Link>

              <Link
                className="w-full sm:w-auto glass-secondary border-2 border-white/20 dark:border-white/10 text-text-primary px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:glass-primary hover:scale-105 transition-all"
                to={"/partners"}
              >
                Our Partners
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
