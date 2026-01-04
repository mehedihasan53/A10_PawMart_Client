import React from "react";
import {
  FaFileContract,
  FaUserCheck,
  FaBan,
  FaBalanceScale,
  FaPaw,
} from "react-icons/fa";
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

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen transition-colors duration-300">
      <DynamicTitle title="Terms of Service | PawMart" />

      <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
              Service
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Please read these terms carefully before using our platform to
            ensure a safe community for our pets.
          </p>
        </div>
        <div className="absolute top-10 right-[-5%] text-orange-100 dark:text-gray-800 text-[250px] rotate-[-15deg] opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {terms.map((term, index) => (
              <div
                key={index}
                className="group p-10 bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800 rounded-[3rem] transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:border-orange-200 dark:hover:border-gray-700"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-14 h-14 bg-white dark:bg-[#0f172a] rounded-2xl flex items-center justify-center text-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    {term.icon}
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                    <span className="text-orange-600 mr-2">{index + 1}.</span>
                    {term.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium pl-2">
                  {term.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-gray-100 dark:border-gray-800 pt-12">
            <div className="inline-block bg-gray-50 dark:bg-gray-800/50 px-8 py-4 rounded-full">
              <p className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-widest">
                Last updated: January 2026 • Legal Inquiries:{" "}
                <span className="text-orange-600 ml-1">legal@pawmart.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
