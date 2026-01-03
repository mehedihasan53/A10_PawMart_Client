import React from "react";
import { FaShieldAlt, FaLock, FaUserSecret, FaEye } from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaEye className="text-orange-500" />,
      title: "Information We Collect",
      content:
        "We collect information that you provide directly to us, such as your name, email address, phone number, and location when you register for an account, apply for adoption, or contact our support team.",
    },
    {
      icon: <FaLock className="text-orange-500" />,
      title: "How We Use Your Data",
      content:
        "Your data is used to facilitate the pet adoption process, verify identities, and improve our services. We do not sell your personal information to third parties for marketing purposes.",
    },
    {
      icon: <FaShieldAlt className="text-orange-500" />,
      title: "Data Protection",
      content:
        "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, though we strive for maximum safety.",
    },
    {
      icon: <FaUserSecret className="text-orange-500" />,
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal data at any time. If you wish to exercise these rights, please contact our support team at pawmart@gmail.com.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300">
      {/* --- Header Section --- */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-[#d1d5db] sm:text-5xl tracking-tight">
            Privacy{" "}
            <span className=" text-orange-600 dark:text-amber-200   dark:bg-[#571515] rounded-full">
              Policy
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Last updated: January 2026. Your privacy is our top priority.
          </p>
        </div>
      </section>

      {/* --- Content Section --- */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 p-8 bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-[#4b5563] rounded-[2rem] shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-orange-50 dark:bg-[#571515] rounded-2xl flex items-center justify-center text-2xl">
                    {section.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-[#d1d5db] mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Additional Info --- */}
          <div className="mt-16 p-8 bg-gray-50 dark:bg-[#1f2937] rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-[#d1d5db] mb-4">
              Cookies & Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              PawMart uses cookies to enhance your browsing experience and
              analyze site traffic. By using our platform, you consent to our
              use of cookies in accordance with this policy.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-500">
              Have questions about our policy? Contact us at{" "}
              <span className="text-orange-600 font-bold">
                pawmart@gmail.com
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
