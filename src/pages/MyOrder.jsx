import React, { useEffect, useState } from "react";
import { useAuth } from "../firebase/firebase.config";
import Loading from "../components/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf, FaBoxOpen } from "react-icons/fa";
import DynamicTitle from "../components/DynamicTitle";

const MyOrder = () => {
  const { user } = useAuth();
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <DynamicTitle title="My Orders" />
      <div className="mb-2 text-center">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="bg-orange-50 px-4 py-3 rounded-lg w-full md:w-auto text-center">
          <p className="text-gray-700">
            Total Orders:{" "}
            <span className="font-bold text-orange-600">{orders.length}</span>
          </p>
        </div>

        {orders.length > 0 && (
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold w-full md:w-auto justify-center"
          >
            <FaFilePdf /> Download Report
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <FaBoxOpen className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No orders yet</h3>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-left">
              <thead className="bg-orange-50">
                <tr>
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">Address</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Notes</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order, i) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{i + 1}</td>
                    <td className="py-4 px-6">{order.buyerName}</td>
                    <td className="py-4 px-6">{order.email}</td>
                    <td className="py-4 px-6">{order.phone}</td>
                    <td className="py-4 px-6">{order.address}</td>
                    <td className="py-4 px-6">{order.date}</td>
                    <td className="py-4 px-6">{order.additionalNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {orders.map((order, i) => (
              <div
                key={order._id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <p className="font-bold mb-1">Order #{i + 1}</p>

                <p>
                  <strong>Name:</strong> {order.buyerName}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Notes:</strong> {order.additionalNotes}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;
