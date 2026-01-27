import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf, FaBoxOpen, FaShoppingBag, FaDownload, FaUser, FaEnvelope, FaPhone, FaHome, FaCalendarAlt, FaStickyNote } from "react-icons/fa";
import DynamicTitle from "../components/DynamicTitle";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://pawmart-server-ebon.vercel.app/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const downloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("PawMart - My Orders", 14, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // PDF Table
    autoTable(doc, {
      head: [["#", "Name", "Email", "Phone", "Address", "Date", "Notes"]],
      body: orders.map((order, i) => [
        i + 1,
        order.buyerName,
        order.email,
        order.phone,
        order.address,
        order.date,
        order.additionalNotes,
      ]),
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 107, 53] },
    });

    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `orders-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface">
      <DynamicTitle title="My Orders | PawMart" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-primary rounded-3xl p-8 md:p-12 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-3"
              >
                My <span className="gradient-text-primary">Orders</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-text-secondary text-lg"
              >
                Track and manage all your orders in one place
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="glass-secondary px-6 py-4 rounded-2xl border border-primary-500/20">
                <p className="text-text-secondary text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-primary-600">{orders.length}</p>
              </div>

              {orders.length > 0 && (
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-white shadow-glow-primary bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaDownload size={16} className="relative z-10" />
                  <span className="relative z-10">Download Report</span>
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-secondary rounded-3xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7, type: "spring", bounce: 0.4 }}
              className="text-8xl mb-8 animate-float"
            >
              <FaBoxOpen className="mx-auto text-primary-400" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-3xl font-bold text-text-primary mb-4"
            >
              No orders yet
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-text-secondary text-lg max-w-md mx-auto"
            >
              Start shopping for your furry friends and your orders will appear here!
            </motion.p>
          </motion.div>
        ) : (
          <>
            {/* Desktop Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden md:block glass-secondary rounded-3xl overflow-hidden shadow-glass-lg"
            >
              <div className="glass-primary p-6 border-b border-primary-500/20">
                <div className="grid grid-cols-7 gap-6 text-sm font-bold text-text-secondary uppercase tracking-wider">
                  <div>#</div>
                  <div>Name</div>
                  <div>Email</div>
                  <div>Phone</div>
                  <div>Address</div>
                  <div>Date</div>
                  <div>Notes</div>
                </div>
              </div>
              <div className="divide-y divide-primary-500/10">
                {orders.map((order, i) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="grid grid-cols-7 gap-6 p-6 hover:bg-primary-50/50 transition-all duration-300"
                  >
                    <div className="flex items-center font-bold text-primary-600">
                      #{i + 1}
                    </div>
                    <div className="flex items-center text-text-primary font-medium">
                      {order.buyerName}
                    </div>
                    <div className="flex items-center text-text-secondary">
                      {order.email}
                    </div>
                    <div className="flex items-center text-text-secondary">
                      {order.phone}
                    </div>
                    <div className="flex items-center text-text-secondary">
                      {order.address}
                    </div>
                    <div className="flex items-center text-text-secondary">
                      {order.date}
                    </div>
                    <div className="flex items-center text-text-secondary">
                      {order.additionalNotes || "No notes"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {orders.map((order, i) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-secondary rounded-3xl p-6 shadow-glass border border-primary-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <FaShoppingBag className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-lg">Order #{i + 1}</h3>
                      <p className="text-text-secondary text-sm">Order Details</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-primary-500 w-4" />
                      <div>
                        <p className="text-text-secondary text-sm">Name</p>
                        <p className="text-text-primary font-medium">{order.buyerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-primary-500 w-4" />
                      <div>
                        <p className="text-text-secondary text-sm">Email</p>
                        <p className="text-text-primary font-medium">{order.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaPhone className="text-primary-500 w-4" />
                      <div>
                        <p className="text-text-secondary text-sm">Phone</p>
                        <p className="text-text-primary font-medium">{order.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaHome className="text-primary-500 w-4" />
                      <div>
                        <p className="text-text-secondary text-sm">Address</p>
                        <p className="text-text-primary font-medium">{order.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-primary-500 w-4" />
                      <div>
                        <p className="text-text-secondary text-sm">Date</p>
                        <p className="text-text-primary font-medium">{order.date}</p>
                      </div>
                    </div>

                    {order.additionalNotes && (
                      <div className="flex items-start gap-3">
                        <FaStickyNote className="text-primary-500 w-4 mt-1" />
                        <div>
                          <p className="text-text-secondary text-sm">Notes</p>
                          <p className="text-text-primary font-medium">{order.additionalNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
