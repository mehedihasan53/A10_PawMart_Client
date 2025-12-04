import { useState, useContext } from "react";
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
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/pets-supplies", label: "Pets & Supplies", icon: FaShoppingBag },
  ];

  const userNavItems = [
    { to: "/add-listing", label: "Add Listing", icon: FaPlus },
    { to: "/my-listings", label: "My Listings", icon: FaList },
    { to: "/my-orders", label: "My Orders", icon: FaShoppingCart },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
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

          {/* Desktop Links */}
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

            {user &&
              userNavItems.map((item) => (
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

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "Profile"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                />
                <span className="text-gray-700 font-medium">
                  {user.displayName || "Profile"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
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
              {[...navItems, ...(user ? userNavItems : [])].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                {!user ? (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 text-gray-700 hover:text-orange-500"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-2.5">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt={user.displayName || "Profile"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.displayName || "Profile"}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="ml-auto w-full text-center py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
