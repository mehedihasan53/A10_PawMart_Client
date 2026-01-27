import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <nav className="navbar-fixed">
        <Navbar />
      </nav>
      {/* Main content */}
      <main className="flex-1 pt-16 lg:pt-18" style={{ paddingTop: '4rem' }}>
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
