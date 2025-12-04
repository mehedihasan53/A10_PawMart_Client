import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaPaw,
  FaHome,
  FaShoppingBag,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation
  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/pets-supplies", icon: FaShoppingBag, label: "Pets & Supplies" },
    { to: "/add-listing", icon: FaPlus, label: "Add Listing" },
    { to: "/my-listings", icon: FaList, label: "My Listings" },
    { to: "/my-orders", icon: FaShoppingCart, label: "My Orders" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg ">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
              <FaPaw className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PawMart
              </h1>
              <p className="text-xs text-gray-500">Pet Adoption & Supply</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  }`
                }
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-orange-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-orange-500"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-3">
            <div className="space-y-2 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-2.5 text-gray-700 hover:text-orange-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
