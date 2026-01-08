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

      {/* Enhanced Recent Activity & Recommendations */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Enhanced Recent Orders */}
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
                <FaBox className="text-lg text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-text-primary">Recent Orders</h4>
                <p className="text-xs text-text-secondary">Your latest purchases</p>
              </div>
            </div>
            {orders.length > 0 && (
              <button className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
                View All
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex items-center justify-between p-3 glass-tertiary rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              ))
            ) : orders.length > 0 ? (
              orders.slice(0, 4).map((order, index) => (
                <motion.div 
                  key={order._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5 hover:glass-secondary transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaBox className="text-primary-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {order.buyerName || `Order #${String(index + 1).padStart(3, '0')}`}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {order.date ? new Date(order.date).toLocaleDateString() : "Recent"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary-600">
                      ৳{Number(order.price || 0).toLocaleString()}
                    </span>
                    <p className="text-xs text-success-600">Completed</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaBox className="text-2xl text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-sm text-text-secondary mb-2">No orders yet</p>
                <p className="text-xs text-text-muted">Start shopping to see your orders here</p>
              </div>
            )}
          </div>
        </div>

        {/* New: Pet Care Recommendations */}
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-secondary-500/10 to-primary-500/10">
              <FaHeart className="text-lg text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-primary">Pet Care Tips</h4>
              <p className="text-xs text-text-secondary">Personalized recommendations</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: "🐕",
                title: "Daily Exercise",
                description: "30 minutes of walking recommended",
                priority: "high",
                color: "from-red-500/10 to-orange-500/10"
              },
              {
                icon: "🥘",
                title: "Nutrition Check",
                description: "Premium food supplies running low",
                priority: "medium",
                color: "from-yellow-500/10 to-orange-500/10"
              },
              {
                icon: "💊",
                title: "Health Reminder",
                description: "Vaccination due next month",
                priority: "low",
                color: "from-blue-500/10 to-purple-500/10"
              },
              {
                icon: "🎾",
                title: "Playtime",
                description: "Interactive toys boost mental health",
                priority: "medium",
                color: "from-green-500/10 to-teal-500/10"
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5 hover:glass-secondary transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${tip.color} rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-text-primary">{tip.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      tip.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      tip.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      {tip.priority}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* New: Quick Actions & Pet Management */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Quick Actions */}
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
              <FaShoppingBag className="text-lg text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-primary">Quick Actions</h4>
              <p className="text-xs text-text-secondary">Common tasks</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { icon: FaShoppingBag, label: "Browse Supplies", link: "/pets-supplies" },
              { icon: FaBox, label: "View All Orders", link: "/my-orders" },
              { icon: FaUserCircle, label: "Update Profile", link: "/dashboard/profile" },
              { icon: FaHeart, label: "My Favorites", link: "/favorites" }
            ].map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 transition-all duration-300 group text-left"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all">
                  <action.icon className="text-sm text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-sm font-medium text-text-primary group-hover:text-primary-600 transition-colors">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Pet Profile Summary */}
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-secondary-500/10 to-primary-500/10">
              <FaHeart className="text-lg text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-primary">My Pets</h4>
              <p className="text-xs text-text-secondary">Pet profiles</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Sample pet data - in real app this would come from user's pet profiles */}
            {[
              { name: "Buddy", type: "Golden Retriever", age: "3 years", emoji: "🐕" },
              { name: "Whiskers", type: "Persian Cat", age: "2 years", emoji: "🐱" }
            ].map((pet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5 hover:glass-secondary transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  {pet.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{pet.name}</p>
                  <p className="text-xs text-text-secondary">{pet.type} • {pet.age}</p>
                </div>
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              </motion.div>
            ))}
            
            <button className="w-full p-3 rounded-xl glass-tertiary hover:glass-secondary border border-white/10 dark:border-white/5 border-dashed transition-all duration-300 group">
              <span className="text-sm font-medium text-text-secondary group-hover:text-primary-600 transition-colors">
                + Add New Pet
              </span>
            </button>
          </div>
        </div>

        {/* Account Status */}
        <div className="glass-card p-6 rounded-3xl border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-success-500/10 to-success-600/10">
              <FaUserCircle className="text-lg text-success-600 dark:text-success-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-primary">Account Status</h4>
              <p className="text-xs text-text-secondary">Your membership</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5">
              <div>
                <p className="text-sm font-medium text-text-primary">Membership</p>
                <p className="text-xs text-text-secondary">Premium Member</p>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500 text-sm" />
                <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">Premium</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5">
              <div>
                <p className="text-sm font-medium text-text-primary">Trust Score</p>
                <p className="text-xs text-text-secondary">Excellent rating</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-success-600">9.8</span>
                <FaStar className="text-success-500 text-xs" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 glass-tertiary rounded-xl border border-white/10 dark:border-white/5">
              <div>
                <p className="text-sm font-medium text-text-primary">Rewards Points</p>
                <p className="text-xs text-text-secondary">Available to redeem</p>
              </div>
              <span className="text-sm font-bold text-primary-600">2,450</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserHome;
