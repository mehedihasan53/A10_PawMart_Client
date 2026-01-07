import React from "react";
import { FaQuestionCircle, FaPaw } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import DynamicTitle from "../DynamicTitle";

const FAQ = () => {
  const faqData = [
    {
      question: "How does the adoption process work?",
      answer:
        "The process starts with browsing our pets, submitting an application, and undergoing a verification call. Once approved, you can meet the pet and finalize the adoption.",
    },
    {
      question: "Are the pets vaccinated?",
      answer:
        "Yes, all pets listed on PawMart are required to have their initial vaccinations and health records verified by our partner vets before being listed.",
    },
    {
      question: "Is there an adoption fee?",
      answer:
        "We charge a minimal processing fee to cover the administrative costs and support our rescue operations. The specific fee varies depending on the pet type.",
    },
    {
      question: "Can I volunteer for PawMart?",
      answer:
        "Absolutely! We are always looking for passionate volunteers for animal care, events, and technical support. Visit our volunteer page or contact us via email.",
    },
    {
      question: "What should I do if I find a stray pet?",
      answer:
        "Please contact our emergency hotline at +880 1976 522844 immediately. Our rescue team will guide you on the next steps.",
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
      <DynamicTitle title="FAQ | PawMart" />

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
              <FaQuestionCircle size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary uppercase">
              Frequently{" "}
              <span className="gradient-text-primary">
                Asked Questions
              </span>
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              Everything you need to know about adoption and how PawMart works.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 left-[-5%] text-primary-100 text-[300px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="collapse collapse-arrow glass-primary border border-white/20 dark:border-white/10 rounded-3xl transition-all duration-300 hover:shadow-glass-lg"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-xl font-black text-text-primary p-8 uppercase tracking-tighter">
                  <span className="text-primary-600 mr-4">0{index + 1}.</span>
                  {item.question}
                </div>
                <div className="collapse-content px-8 pb-8">
                  <p className="text-text-secondary leading-relaxed text-lg font-medium pl-10 border-l-4 border-primary-500/20">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 p-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-[-20%] right-[-10%] text-white/10 text-[200px] rotate-12 pointer-events-none">
              <FaQuestionCircle />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">
                Still have questions?
              </h2>
              <p className="text-white/90 mb-10 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                If you couldn't find your answer, our support team is happy to
                help you find the perfect companion.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-primary-600 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-glass-lg"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
