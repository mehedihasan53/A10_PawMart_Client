import React from "react";
import { FaQuestionCircle, FaPaw } from "react-icons/fa";
import { Link } from "react-router";
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

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen transition-colors duration-300">
      <DynamicTitle title="FAQ | PawMart" />

      <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 text-orange-600 rounded-[2rem] mb-8 border border-orange-100 dark:border-gray-700">
            <FaQuestionCircle size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Frequently{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
              Asked
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need to know about adoption and how PawMart works.
          </p>
        </div>
        <div className="absolute top-10 left-[-5%] text-orange-100 dark:text-gray-800 text-[250px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800 rounded-[2rem] transition-all duration-300"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-xl font-black text-gray-900 dark:text-white p-8 uppercase tracking-tighter">
                  <span className="text-orange-600 mr-4">0{index + 1}.</span>
                  {item.question}
                </div>
                <div className="collapse-content px-8 pb-8">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium pl-10 border-l-2 border-orange-200 dark:border-orange-900">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-[3.5rem] text-center relative overflow-hidden">
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
                className="inline-block bg-white text-orange-600 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300"
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
