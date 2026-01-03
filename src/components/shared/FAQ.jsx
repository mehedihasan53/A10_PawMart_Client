import React from "react";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";

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
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300">
      {/* --- Header Section --- */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-[#571515] text-orange-600 dark:text-orange-400 rounded-2xl mb-6">
            <FaQuestionCircle size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-[#d1d5db] sm:text-5xl">
            Frequently{" "}
            <span className=" text-orange-600 dark:text-amber-200   dark:bg-[#571515] rounded-full">
              Asked Question
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about adoption and how PawMart works.
          </p>
        </div>
      </section>

      {/* --- FAQ Accordion Section --- */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-[#4b5563] rounded-2xl shadow-sm overflow-hidden"
              >
                <input
                  type="radio"
                  name="my-accordion-2"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-xl font-bold text-gray-900 dark:text-[#d1d5db] p-6">
                  {item.question}
                </div>
                <div className="collapse-content px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Still Have Questions Section --- */}
          <div className="mt-20 p-10 bg-orange-50 dark:bg-[#571515] rounded-[2.5rem] text-center border border-orange-100 dark:border-orange-900/30">
            <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-4">
              Still have questions?
            </h2>
            <p className="text-orange-800 dark:text-orange-200/80 mb-8">
              If you couldn't find your answer, our support team is happy to
              help you.
            </p>
            <Link
              to={"/contact"}
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
