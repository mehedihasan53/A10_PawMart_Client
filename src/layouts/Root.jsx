import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Fixed Navbar with stronger positioning */}
      <nav className="navbar-fixed">
        <Navbar />
      </nav>
      {/* Main content with top padding to account for fixed navbar */}
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

export default Root;
