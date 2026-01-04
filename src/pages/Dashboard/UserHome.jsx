import { useContext, useMemo } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaBox,
  FaHeart,
  FaShoppingBag,
  FaUserCircle,
  FaChartLine,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  const { data: orders = [] } = useQuery({
    queryKey: ["user-orders", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pawmart-server-ebon.vercel.app/orders?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // Calculate Total Spent
  const totalSpent = orders.reduce(
    (sum, order) => sum + (Number(order.price) || 0),
    0
  );

  // Prepare Chart Data
  const chartData = useMemo(() => {
    const dataMap = orders.reduce((acc, order) => {
      const date = order.date || "Unknown";
      acc[date] = (acc[date] || 0) + (Number(order.price) || 0);
      return acc;
    }, {});

    return Object.keys(dataMap)
      .map((date) => ({
        date,
        amount: dataMap[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [orders]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-[2.5rem] shadow-xl text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
          ) : (
            <FaUserCircle size={96} className="text-white/50" />
          )}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Welcome back,{" "}
              <span className="text-orange-100">{user?.displayName}!</span> 👋
            </h2>
            <p className="text-orange-50 opacity-90 mt-2 font-medium">
              Check your spending patterns and manage your pet supplies.
            </p>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center space-x-4 shadow-sm hover:shadow-xl transition-all group">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <FaBox size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
              Orders
            </p>
            <h3 className="text-3xl font-black dark:text-white">
              {orders.length}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center space-x-4 shadow-sm hover:shadow-xl transition-all group">
          <div className="bg-green-500/10 p-4 rounded-2xl text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
            <FaShoppingBag size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
              Spending
            </p>
            <h3 className="text-3xl font-black dark:text-white">
              ৳{totalSpent}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center space-x-4 shadow-sm hover:shadow-xl transition-all group">
          <div className="bg-rose-500/10 p-4 rounded-2xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
            <FaHeart size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
              Saved
            </p>
            <h3 className="text-3xl font-black dark:text-white">0</h3>
          </div>
        </div>
      </div>

      {/* --- Chart Section --- */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <FaChartLine className="text-orange-500 text-xl" />
          <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">
            Spending Analytics
          </h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "15px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#f97316"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAmt)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
