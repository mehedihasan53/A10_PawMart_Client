import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaHome } from "react-icons/fa";
import DynamicTitle from "./DynamicTitle";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex flex-col items-center justify-center px-4">
      <DynamicTitle title="404 Not Found" />
      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
            404
          </h1>
          <div className="flex justify-center -mt-6">
            {[...Array(3)].map((_, i) => (
              <FaPaw
                key={i}
                className="text-orange-400 text-2xl mx-1 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <FaHome className="group-hover:rotate-12 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
