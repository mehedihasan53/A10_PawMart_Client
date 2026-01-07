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
  FaArrowUp,
  FaCalendarAlt,
  FaStar,
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
import { motion } from "framer-motion";
import Avatar from "../../components/ui/Avatar";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  const { data: orders = [], isLoading } = useQuery({
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, delay = 0 }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10 group hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-2xl text-white" />
        </div>
        <FaArrowUp className="text-success-500 text-sm" />
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-2">
          {title}
        </p>
        <h3 className="text-3xl font-black text-text-primary mb-1">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-12 rounded"></div>
          ) : (
            value
          )}
        </h3>
        {subtitle && (
          <p className="text-xs text-text-secondary font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Enhanced Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden glass-primary p-8 rounded-3xl border border-white/20 dark:border-white/10 backdrop-blur-20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName || "User"}
              size="xl"
              className="ring-4 ring-white/20 dark:ring-white/10 shadow-glass"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
                Welcome back,{" "}
                <span className="gradient-text-primary">{user?.displayName || "User"}!</span>
              </h2>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500 text-lg" />
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">Premium</span>
              </div>
            </div>
            <p className="text-text-secondary font-medium mb-4">
              Track your pet care journey and manage your orders with ease
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary-500" />
                <span className="text-text-secondary">Member since Jan 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span className="text-success-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          icon={FaBox}
          title="Total Orders"
          value={orders.length}
          subtitle="Lifetime purchases"
          color="from-primary-500 to-primary-600"
          delay={0.1}
        />
        <StatCard
          icon={FaShoppingBag}
          title="Total Spent"
          value={`৳${totalSpent.toLocaleString()}`}
          subtitle="This month: ৳2,450"
          color="from-success-500 to-success-600"
          delay={0.2}
        />
        <StatCard
          icon={FaHeart}
          title="Favorites"
          value="12"
          subtitle="Saved items"
          color="from-secondary-500 to-secondary-600"
          delay={0.3}
        />
      </motion.div>

      {/* Enhanced Chart Section */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-8 rounded-3xl border border-white/20 dark:border-white/10 backdrop-blur-20"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
              <FaChartLine className="text-2xl text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                Spending Analytics
              </h3>
              <p className="text-text-secondary">
                Track your pet care expenses over time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 glass-tertiary rounded-xl border border-white/10 dark:border-white/5">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-text-secondary">Live</span>
          </div>
        </div>

        <div className="h-80 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse space-y-4 w-full">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(156, 163, 175, 0.2)"
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
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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
          )}
        </div>
      </motion.div>

      {/* Enhanced Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
              <FaBox className="text-lg text-primary-600 dark:text-primary-400" />
            </div>
            <h4 className="text-lg font-bold text-text-primary">
              Recent Orders
            </h4>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Order #{order.id || `00${index + 1}`}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {order.date || "Recent"}
                  </p>
                </div>
                <span className="text-sm font-bold text-primary-600">
                  ৳{order.price || 0}
                </span>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-sm text-text-secondary text-center py-4">
                No orders yet
              </p>
            )}
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-secondary-500/10 to-primary-500/10">
              <FaHeart className="text-lg text-secondary-600 dark:text-secondary-400" />
            </div>
            <h4 className="text-lg font-bold text-text-primary">
              Quick Actions
            </h4>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300 group">
              <span className="text-sm font-medium text-text-primary group-hover:text-primary-600">
                Browse Pet Supplies
              </span>
            </button>
            <button className="w-full text-left p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300 group">
              <span className="text-sm font-medium text-text-primary group-hover:text-primary-600">
                View Order History
              </span>
            </button>
            <button className="w-full text-left p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300 group">
              <span className="text-sm font-medium text-text-primary group-hover:text-primary-600">
                Update Profile
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserHome;
