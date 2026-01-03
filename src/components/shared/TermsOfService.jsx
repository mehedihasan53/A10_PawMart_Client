import React from "react";
import {
  FaFileContract,
  FaUserCheck,
  FaBan,
  FaBalanceScale,
} from "react-icons/fa";

const TermsOfService = () => {
  const terms = [
    {
      icon: <FaUserCheck className="text-orange-500" />,
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using the PawMart platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.",
    },
    {
      icon: <FaFileContract className="text-orange-500" />,
      title: "2. Adoption Process",
      content:
        "All pet adoptions through PawMart are subject to a verification process. We reserve the right to approve or deny any adoption application based on our safety standards and the pet's well-being.",
    },
    {
      icon: <FaBan className="text-orange-500" />,
      title: "3. Prohibited Activities",
      content:
        "Users are prohibited from providing false information, engaging in animal cruelty, or using the platform for any illegal animal trading. Violation of this will lead to an immediate ban.",
    },
    {
      icon: <FaBalanceScale className="text-orange-500" />,
      title: "4. Limitation of Liability",
      content:
        "PawMart acts as a bridge between pets and adopters. While we verify information, we are not responsible for any issues arising after the adoption is finalized.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300">
      {/* --- Header Section --- */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-[#d1d5db] sm:text-5xl tracking-tight">
            Terms of{" "}
            <span className=" text-orange-600 dark:text-amber-200   dark:bg-[#571515] rounded-full">
              Service
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {terms.map((term, index) => (
              <div
                key={index}
                className="p-8 bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-[#4b5563] rounded-[2rem] shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-50 dark:bg-[#571515] rounded-xl flex items-center justify-center text-xl">
                    {term.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-[#d1d5db]">
                    {term.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg pl-2">
                  {term.content}
                </p>
              </div>
            ))}
          </div>

          {/* --- Last Updated Note --- */}
          <div className="mt-16 text-center border-t border-gray-100 dark:border-gray-800 pt-10">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Last updated: January 2026. For any legal inquiries, contact us at{" "}
              <span className="text-orange-600 font-bold">
                legal@pawmart.com
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
