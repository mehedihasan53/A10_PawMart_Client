import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300">
      {/* --- Header Section --- */}
      <section className="py-16 bg-gray-50 dark:bg-[#1f2937] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-[#d1d5db] sm:text-5xl">
            Get in{" "}
            <span className=" text-orange-600 dark:text-amber-200   dark:bg-[#571515] rounded-full">
              Touch
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about adoption or want to support our mission? Our
            team is ready to assist you.
          </p>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 1. Contact Information Column */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-[#d1d5db] mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  We value your feedback and inquiries. Reach out to us through
                  any of the following channels, and we will get back to you
                  within 24 business hours.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-[#571515] text-orange-600 dark:text-orange-400 transition-colors">
                      <FaEnvelope />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Email Us
                      </p>
                      <p className="text-lg font-medium text-gray-800 dark:text-[#d1d5db]">
                        pawmart@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-[#571515] text-orange-600 dark:text-orange-400 transition-colors">
                      <FaPhoneAlt />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Call Us
                      </p>
                      <p className="text-lg font-medium text-gray-800 dark:text-[#d1d5db]">
                        +880 1976 522844
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-[#571515] text-orange-600 dark:text-orange-400 transition-colors">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Our Office
                      </p>
                      <p className="text-lg font-medium text-gray-800 dark:text-[#d1d5db]">
                        Savar, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Support Card */}
              <div className="p-8 bg-orange-50 dark:bg-[#571515] rounded-[2rem] border border-orange-100 dark:border-orange-900/30 flex gap-5">
                <FaExclamationTriangle className="text-orange-600 dark:text-orange-400 text-3xl flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2 italic">
                    Emergency Support?
                  </h3>
                  <p className="text-orange-800 dark:text-orange-200/80 leading-relaxed">
                    For urgent animal rescue or medical emergencies, please call
                    our 24/7 hotline directly at{" "}
                    <strong>+880 1976 522844</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Contact Form Column */}
            <div className="bg-white dark:bg-[#1f2937] p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-[#d1d5db] focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-[#d1d5db] focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-[#d1d5db] focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Pet Adoption Information</option>
                    <option>Donation & Sponsorship</option>
                    <option>Volunteer Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your message here..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-[#d1d5db] focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 "
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
