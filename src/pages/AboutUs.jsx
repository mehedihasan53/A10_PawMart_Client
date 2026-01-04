import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaHeart, FaUsers, FaShieldAlt } from "react-icons/fa";
import DynamicTitle from "../components/DynamicTitle";

const AboutUs = () => {
  const stats = [
    { label: "Pets Adopted", value: "12,000+", icon: <FaPaw /> },
    { label: "Active Volunteers", value: "450+", icon: <FaUsers /> },
    { label: "Partner Shelters", value: "85+", icon: <FaShieldAlt /> },
    { label: "Cities Covered", value: "30+", icon: <FaHeart /> },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] transition-colors duration-300 overflow-hidden">
      <DynamicTitle title="About Us | PawMart" />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-orange-50 to-white dark:from-[#1e293b] dark:to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
              Building a better{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
                world for every pet.
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
              PawMart is a mission-driven organization dedicated to connecting
              abandoned pets with loving homes through technology, transparency,
              and community action.
            </p>
          </div>
        </div>
        <div className="absolute top-10 right-[-5%] text-orange-100 dark:text-gray-800 text-[300px] -rotate-12 opacity-50 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1e293b] p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 text-center transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-orange-500 text-2xl flex justify-center mb-4">
                  {item.icon}
                </div>
                <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-2xl"></div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">
                Our Mission <span className="text-orange-600">&</span> Vision
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Founded in 2023, PawMart was born out of a simple observation:
                  thousands of pets need homes and thousands of families are
                  ready to love them, but the connection was broken.
                </p>
                <p className="border-l-4 border-orange-500 pl-6 italic font-medium">
                  "We believe that every animal deserves a second chance at life
                  and a first-class home."
                </p>
                <p>
                  We focus on transparency, animal safety, and responsible
                  ownership. Our platform ensures that every adoption process is
                  verified and every pet's health history is documented.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Our Team Working"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#1e293b]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Our Core <span className="text-pink-500">Values</span>
            </h2>
            <div className="h-1.5 w-24 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Empathy First",
                icon: <FaHeart />,
                desc: "We prioritize the well-being and emotional health of animals in every decision we make.",
              },
              {
                title: "Transparency",
                icon: <FaShieldAlt />,
                desc: "Full disclosure of pet health and background to ensure long-term adoption success.",
              },
              {
                title: "Community",
                icon: <FaUsers />,
                desc: "Building a network of volunteers and vets to provide a 360-degree support system.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group p-10 bg-white dark:bg-[#0f172a] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-block p-3 px-6 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 font-bold text-sm mb-6 uppercase tracking-widest">
            Join the movement
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tighter">
            Ready to make a <span className="text-orange-600">Difference?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-orange-500/40 transition-all active:scale-95"
              to={"/contact"}
            >
              Contact Support
            </Link>

            <Link
              className="w-full sm:w-auto border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
              to={"/partners"}
            >
              Our Partners
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
