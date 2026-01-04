import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminHome = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin-stats")
      .then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm font-bold uppercase">
            Total Users
          </p>
          <h2 className="text-4xl font-black">{stats.totalUsers}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-bold uppercase">
            Total Pets
          </p>
          <h2 className="text-4xl font-black">{stats.totalPets}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-bold uppercase">
            Total Orders
          </p>
          <h2 className="text-4xl font-black">{stats.totalOrders}</h2>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold mb-6">Pets by Category</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
