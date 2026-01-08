import React, { useState } from "react";
import { FaQuestionCircle, FaPaw, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";
import DynamicTitle from "../DynamicTitle";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-gradient-to-br from-bg-primary to-bg-surface transition-colors duration-300 overflow-hidden">
      <DynamicTitle title="FAQ | PawMart" />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary-50/50 to-bg-primary dark:from-primary-950/50 dark:to-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
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
          </div>
        </div>
        <div className="absolute top-10 left-[-5%] text-primary-100 dark:text-primary-900 text-[300px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="glass-primary border border-white/20 dark:border-white/10 rounded-3xl transition-all duration-300 hover:shadow-glass-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-8 focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-3xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-primary-600 mr-4 font-black text-xl">
                        0{index + 1}.
                      </span>
                      <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <FaChevronDown
                        className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8">
                    <p className="text-text-secondary leading-relaxed text-lg font-medium pl-10 border-l-4 border-primary-500/20">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-24 p-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl text-center relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
