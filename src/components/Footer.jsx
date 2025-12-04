import React from "react";
import { Link } from "react-router-dom";
import {
  FaPaw,
  FaHome,
  FaShoppingBag,
  FaPhone,
  FaLock,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
                <FaPaw className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PawMart
              </h2>
            </div>
            <p className="text-gray-600">
              PawMart connects local pet owners and buyers for adoption and pet
              care products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </Link>
              <Link
                to="/pets-supplies"
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaShoppingBag className="text-lg" />
                <span>Pets & Supplies</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaPhone className="text-lg" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Legal</h3>
            <div className="space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaLock className="text-lg" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaFileAlt className="text-lg" />
                <span>Terms of Service</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaQuestionCircle className="text-lg" />
                <span>FAQ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} PawMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
