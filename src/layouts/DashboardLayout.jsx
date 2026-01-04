import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaChartBar,
  FaSignOutAlt,
  FaPaw,
  FaUsers,
  FaClipboardList,
  FaBars,
  FaExternalLinkAlt,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import { AuthContext } from "../provider/AuthProvider";
import ScrollToTop from "../components/shared/ScrollToTop";

const DashboardLayout = () => {
  const [role] = useRole();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    `flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${
      isActive
        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
        : "text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-500"
    }`;

  const SidebarContent = () => (
    <>
      <div className="p-8 flex items-center gap-3">
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2.5 rounded-2xl shadow-lg">
          <FaPaw className="text-white text-2xl" />
        </div>
        <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
          PawMart
        </span>
      </div>

      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2 mb-2">
          Navigation
        </p>

        <NavLink to="/" className={navStyle}>
          <div className="flex items-center">
            <FaExternalLinkAlt className="mr-3 text-lg text-orange-400" />
            <span>Home</span>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={navStyle}
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="flex items-center">
            <FaUser className="mr-3 text-lg" /> <span>My Profile</span>
          </div>
        </NavLink>

        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2 mb-2">
            {role === "admin" ? "Administrator" : "User Dashboard"}
          </p>

          {role === "admin" ? (
            <>
              <NavLink
                to="/dashboard/admin-home"
                className={navStyle}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="flex items-center">
                  <FaChartBar className="mr-3 text-lg" /> <span>Overview</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/manage-users"
                className={navStyle}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="flex items-center">
                  <FaUsers className="mr-3 text-lg" /> <span>Manage Users</span>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/user-home"
                className={navStyle}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="flex items-center">
                  <FaHome className="mr-3 text-lg" /> <span>Overview</span>
                </div>
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <div className="p-6 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-4 bg-red-50 text-red-600 rounded-2xl font-bold transition-all hover:bg-red-100"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <ScrollToTop/>
      <div className="w-72 bg-white dark:bg-gray-800 shadow-2xl hidden md:flex flex-col sticky top-0 h-screen">
        <SidebarContent />
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
        ></div>
        <div
          className={`absolute left-0 h-full w-72 bg-white dark:bg-gray-800 transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-white dark:bg-gray-800 p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <FaPaw className="text-orange-500 text-xl" />
            <span className="font-black dark:text-white">PawMart</span>
          </div>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl"
          >
            <FaBars className="text-gray-600 dark:text-gray-300" />
          </button>
        </header>

        <main className="flex-1 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
