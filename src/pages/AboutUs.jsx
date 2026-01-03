import React from "react";
import { Link } from "react-router";

const AboutUs = () => {
  const stats = [
    { label: "Pets Adopted", value: "12,000+" },
    { label: "Active Volunteers", value: "450+" },
    { label: "Partner Shelters", value: "85+" },
    { label: "Cities Covered", value: "30+" },
  ];

  return (
    <div className="bg-white dark:bg-[#111827] transition-colors duration-300">
      {/* Hero Section  */}
      <section className="py-20 bg-gray-50 dark:bg-[#1f2937] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-[#d1d5db] sm:text-5xl">
              Building a better{" "}
              <span className=" text-orange-600 dark:text-amber-200   dark:bg-[#571515] rounded-full">
                world for every pet.
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              PawMart is a mission-driven organization dedicated to connecting
              abandoned pets with loving homes through technology and community
              action.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-500">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-[#d1d5db] mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Founded in 2023, PawMart was born out of a simple observation:
                  there are thousands of pets in need of homes and thousands of
                  families ready to love them, but the connection was broken.
                </p>
                <p>
                  We focus on transparency, animal safety, and responsible
                  ownership. Our platform ensures that every adoption process is
                  verified and every pet's health history is documented.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#1f2937] h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Our Team Working"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 dark:bg-[#1f2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#d1d5db] text-center mb-16">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Empathy First",
                desc: "We prioritize the well-being and emotional health of animals in every decision we make.",
              },
              {
                title: "Transparency",
                desc: "Full disclosure of pet health and background to ensure long-term adoption success.",
              },
              {
                title: "Community",
                desc: "Building a network of volunteers and vets to provide a 360-degree support system.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="space-y-4 p-6 bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-orange-500">
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

      {/* Simple CTA */}
      <section className="py-20 text-center border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#d1d5db] mb-8">
            Want to learn more about our work?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95"
              to={"/contact"}
            >
              Contact Support
            </Link>

            <Link
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-[#d1d5db] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-[#1f2937] transition-all"
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
