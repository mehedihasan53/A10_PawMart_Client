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
    <footer className="relative navbar-glass border-t border-white/10 dark:border-white/5 mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <FaPaw className="text-primary-500 text-2xl mr-2" />
              <h2 className="text-2xl font-bold gradient-text-primary">PawMart</h2>
            </div>
            <p className="text-text-secondary mb-6 leading-relaxed">
              A safe place to adopt pets, buy supplies, and connect with caring
              pet owners. Building a community where every pet finds their forever home.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-button hover:scale-105 transition-all duration-300 group"
                aria-label="Follow us on Twitter"
              >
                <SiX className="text-lg text-text-secondary group-hover:text-primary-500 transition-colors" />
              </a>
              <a
                href="https://github.com/mehedihasan53"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-button hover:scale-105 transition-all duration-300 group"
                aria-label="View our GitHub"
              >
                <SiGithub className="text-lg text-text-secondary group-hover:text-text-primary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/mehedi-hasan-x3/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-button hover:scale-105 transition-all duration-300 group"
                aria-label="Connect on LinkedIn"
              >
                <SiLinkedin className="text-lg text-text-secondary group-hover:text-blue-500 transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-button hover:scale-105 transition-all duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <SiInstagram className="text-lg text-text-secondary group-hover:text-pink-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaHome className="text-sm" />
                  </div>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/pets-supplies"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaShoppingBag className="text-sm" />
                  </div>
                  Pets & Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaPaw className="text-sm" />
                  </div>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaUsers className="text-sm" />
                  </div>
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Legal & Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faq"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaQuestionCircle className="text-sm" />
                  </div>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaShieldAlt className="text-sm" />
                  </div>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="flex items-center text-text-secondary hover:text-primary-500 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                    <FaFileContract className="text-sm" />
                  </div>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center group">
                <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                  <FaEnvelope className="text-sm text-primary-500" />
                </div>
                <span className="text-text-secondary break-all">hello@pawmart.com</span>
              </div>
              <div className="flex items-center group">
                <div className="p-1.5 rounded-lg glass-tertiary mr-3 group-hover:glass-secondary transition-all duration-300">
                  <FaPhone className="text-sm text-primary-500" />
                </div>
                <span className="text-text-secondary">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start group">
                <div className="p-1.5 rounded-lg glass-tertiary mr-3 mt-0.5 group-hover:glass-secondary transition-all duration-300">
                  <FaMapMarkerAlt className="text-sm text-primary-500" />
                </div>
                <span className="text-text-secondary">123 Pet Street, Animal City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-8 pt-8">
          {/* Divider */}
          <div className="absolute top-0 left-0 right-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent h-px"></div>
            <div className="relative bg-white/10 dark:bg-white/5 h-px"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-muted text-center md:text-left">
              © {new Date().getFullYear()} PawMart. All rights reserved.
            </p>

            {/* Additional Legal Links for Mobile */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-text-muted hover:text-primary-500 transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-text-muted hover:text-primary-500 transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                to="/faq"
                className="text-text-muted hover:text-primary-500 transition-colors duration-300"
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