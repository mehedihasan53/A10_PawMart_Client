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
import { motion } from "framer-motion";
import {
  FaUsers,
  FaPaw,
  FaShoppingCart,
  FaChartBar,
  FaArrowUp,
  FaEye,
} from "react-icons/fa";

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://pawmart-server-ebon.vercel.app/admin-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  const StatCard = ({ icon: Icon, title, value, color, delay = 0 }) => (
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
        <div className="text-right">
          <FaArrowUp className="text-success-500 text-sm mb-1" />
          <span className="text-xs text-success-600 font-medium">+12%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-2">
          {title}
        </p>
        <h2 className="text-4xl font-black text-text-primary">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-16 rounded"></div>
          ) : (
            value || 0
          )}
        </h2>
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
      {/* Enhanced Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500">
            <FaChartBar className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-text-primary tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-text-secondary font-medium">
              Monitor your platform's performance and growth
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={stats.totalUsers}
          color="from-primary-500 to-primary-600"
          delay={0.1}
        />
        <StatCard
          icon={FaPaw}
          title="Total Pets"
          value={stats.totalPets}
          color="from-secondary-500 to-secondary-600"
          delay={0.2}
        />
        <StatCard
          icon={FaShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          color="from-success-500 to-success-600"
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
              <FaChartBar className="text-2xl text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                Pets by Category
              </h3>
              <p className="text-text-secondary">
                Distribution across different pet categories
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <FaEye className="text-sm" />
            <span className="text-sm font-medium">Live Data</span>
          </div>
        </div>

        <div className="h-96 w-full">
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
              <BarChart data={stats.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="rgba(156, 163, 175, 0.2)"
                />
                <XAxis 
                  dataKey="category" 
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
                    backgroundColor: 'rgba(220, 103, 25, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                  cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#barGradient)" 
                  radius={[8, 8, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>

      {/* Additional Insights Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-warning-500/10 to-warning-600/10">
              <FaArrowUp className="text-lg text-warning-600 dark:text-warning-400" />
            </div>
            <h4 className="text-lg font-bold text-text-primary">
              Growth Metrics
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">User Growth</span>
              <span className="text-sm font-bold text-success-600">+15.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Pet Listings</span>
              <span className="text-sm font-bold text-success-600">+8.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Order Volume</span>
              <span className="text-sm font-bold text-success-600">+22.1%</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
              <FaEye className="text-lg text-primary-600 dark:text-primary-400" />
            </div>
            <h4 className="text-lg font-bold text-text-primary">
              Quick Actions
            </h4>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300">
              <span className="text-sm font-medium text-text-primary">
                View User Reports
              </span>
            </button>
            <button className="w-full text-left p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300">
              <span className="text-sm font-medium text-text-primary">
                Export Analytics
              </span>
            </button>
            <button className="w-full text-left p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300">
              <span className="text-sm font-medium text-text-primary">
                System Settings
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminHome;
