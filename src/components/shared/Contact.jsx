import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPaw,
} from "react-icons/fa";
import DynamicTitle from "../DynamicTitle";

const Contact = () => {
  const contactInfo = [
    {
      title: "Email Us",
      value: "pawmart@gmail.com",
      icon: <FaEnvelope />,
    },
    {
      title: "Call Us",
      value: "+880 1976 522844",
      icon: <FaPhoneAlt />,
    },
    {
      title: "Our Office",
      value: "Savar, Dhaka, Bangladesh",
      icon: <FaMapMarkerAlt />,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <DynamicTitle title="Contact Us | PawMart" />

      <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white dark:from-[#1e293b] dark:to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
              Touch
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about adoption or want to support our mission? Our
            team is ready to assist you.
          </p>
        </div>
        <div className="absolute top-10 left-[-5%] text-orange-100 dark:text-gray-800 text-[250px] rotate-12 opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">
                  Contact <span className="text-orange-600">Information</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  We value your feedback and inquiries. Reach out to us through
                  any of the following channels, and we will get back to you
                  within 24 business hours.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-center group p-4 rounded-2xl border border-transparent hover:border-orange-100 dark:hover:border-gray-800 hover:bg-orange-50/30 dark:hover:bg-gray-800/30 transition-all duration-300"
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-[#1e293b] text-orange-600 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                        {info.icon}
                      </div>
                      <div className="ml-6">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                          {info.title}
                        </p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group p-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-[2.5rem] overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] text-white/10 text-[150px] rotate-12">
                  <FaExclamationTriangle />
                </div>
                <div className="relative z-10 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                    <FaExclamationTriangle />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-xl uppercase tracking-tight mb-2">
                      Emergency Support?
                    </h3>
                    <p className="text-white/90 leading-relaxed font-medium">
                      For urgent animal rescue or medical emergencies, call our
                      24/7 hotline directly at <br />
                      <span className="text-2xl font-black block mt-2 text-white">
                        +880 1976 522844
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">
                Send us a <span className="text-pink-500">Message</span>
              </h3>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Subject
                  </label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-bold cursor-pointer appearance-none">
                    <option>General Inquiry</option>
                    <option>Pet Adoption Information</option>
                    <option>Donation & Sponsorship</option>
                    <option>Volunteer Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-pink-500 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
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
