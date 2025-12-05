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
    <footer className="bg-gray-50 border-t border-gray-200 py-10 ">
      <div className="container mx-auto px-4">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
                <FaPaw className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PawMart
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A safe place to adopt pets, buy supplies, and connect with caring
              pet owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <FaHome />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/pets-supplies"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <FaShoppingBag />
                  <span>Pets & Supplies</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <FaPhone />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <FaLock />
                  <span>Privacy Policy</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <FaFileAlt />
                  <span>Terms of Service</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition"
                >
                  <FaQuestionCircle />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center border-t border-gray-200 mt-10 pt-5">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PawMart — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
