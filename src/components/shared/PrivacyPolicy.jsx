import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaEye,
  FaPaw,
} from "react-icons/fa";
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

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen transition-colors duration-300">
      <DynamicTitle title="Privacy Policy | PawMart" />

      <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
              Policy
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Last updated: January 2026. Your privacy and the safety of our
            community is our top priority.
          </p>
        </div>
        <div className="absolute top-10 left-[-5%] text-orange-100 dark:text-gray-800 text-[250px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 p-10 bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800 rounded-[3rem] transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:border-orange-200 dark:hover:border-gray-700"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white dark:bg-[#0f172a] rounded-2xl flex items-center justify-center text-2xl text-orange-600">
                    {section.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 bg-white dark:bg-[#1e293b] rounded-[3rem] border-2 border-dashed border-orange-100 dark:border-gray-800">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-widest">
              Cookies & Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-lg">
              PawMart uses cookies to enhance your browsing experience and
              analyze site traffic. By using our platform, you consent to our
              use of cookies in accordance with this policy.
            </p>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-1 rounded-full bg-gray-100 dark:bg-gray-800 px-6 py-3">
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">
                Questions? Email us at{" "}
                <span className="text-orange-600 ml-1">pawmart@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
