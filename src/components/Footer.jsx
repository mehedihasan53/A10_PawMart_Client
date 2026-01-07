import { Link } from "react-router-dom";
import {
  FaPaw,
  FaHome,
  FaShoppingBag,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
  FaUsers,
} from "react-icons/fa";
import { SiX, SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <FaPaw className="text-orange-500 text-2xl mr-2" />
              <h2 className="text-2xl font-bold">PawMart</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A safe place to adopt pets, buy supplies, and connect with caring
              pet owners. Building a community where every pet finds their forever home.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <SiX className="text-xl" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="View our GitHub"
              >
                <SiGithub className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <SiLinkedin className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <SiInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/pets-supplies"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaShoppingBag className="mr-2" />
                  Pets & Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaPaw className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaUsers className="mr-2" />
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaQuestionCircle className="mr-2" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaShieldAlt className="mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                >
                  <FaFileContract className="mr-2" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-orange-500 flex-shrink-0" />
                <span className="break-all">hello@pawmart.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-orange-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="mr-2 text-orange-500 flex-shrink-0 mt-1" />
                <span>123 Pet Street, Animal City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} PawMart. All rights reserved.
            </p>
            
            {/* Additional Legal Links for Mobile */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/faq"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;