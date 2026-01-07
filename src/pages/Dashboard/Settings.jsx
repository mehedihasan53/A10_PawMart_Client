import { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaDatabase,
  FaSave,
  FaCheck,
  FaMoon,
  FaSun,
  FaDesktop,
} from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useTheme from "../../hooks/useTheme";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import { cn } from "../../utils/cn";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { isDark, toggleTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: false,
      orderUpdates: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
    preferences: {
      language: "en",
      currency: "USD",
      timezone: "UTC",
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "privacy", label: "Privacy", icon: FaShieldAlt },
    { id: "appearance", label: "Appearance", icon: FaPalette },
    { id: "preferences", label: "Preferences", icon: FaGlobe },
    { id: "data", label: "Data & Storage", icon: FaDatabase },
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar
                  src={user?.photoURL}
                  alt={user?.displayName || "User"}
                  size="xl"
                  className="ring-4 ring-primary-200/50 dark:ring-primary-700/50"
                />
                <button className="absolute -bottom-2 -right-2 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
                  <FaUser className="text-sm" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-text-secondary">{user?.email}</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ""}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your display name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Email Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl glass-secondary">
                    <div>
                      <p className="font-medium text-text-primary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {key === 'email' && 'Receive email notifications for important updates'}
                        {key === 'push' && 'Get push notifications on your device'}
                        {key === 'marketing' && 'Receive promotional emails and offers'}
                        {key === 'orderUpdates' && 'Get notified about order status changes'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('notifications', key, !value)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        value ? "bg-primary-500" : "bg-gray-300 dark:bg-gray-600"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          value ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Profile Visibility
              </h3>
              <div className="space-y-3">
                {['public', 'private', 'friends'].map((option) => (
                  <label key={option} className="flex items-center p-4 rounded-xl glass-secondary cursor-pointer hover:glass-primary transition-all">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value={option}
                      checked={settings.privacy.profileVisibility === option}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      className="sr-only"
                    />
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center",
                      settings.privacy.profileVisibility === option
                        ? "border-primary-500 bg-primary-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}>
                      {settings.privacy.profileVisibility === option && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary capitalize">{option}</p>
                      <p className="text-sm text-text-secondary">
                        {option === 'public' && 'Anyone can see your profile'}
                        {option === 'private' && 'Only you can see your profile'}
                        {option === 'friends' && 'Only your connections can see your profile'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl glass-secondary">
                    <div>
                      <p className="font-medium text-text-primary capitalize">
                        Show {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Allow others to see your {key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('privacy', key, !value)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        value ? "bg-primary-500" : "bg-gray-300 dark:bg-gray-600"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          value ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Theme Preference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', icon: FaSun, description: 'Clean and bright interface' },
                  { id: 'dark', label: 'Dark', icon: FaMoon, description: 'Easy on the eyes' },
                  { id: 'system', label: 'System', icon: FaDesktop, description: 'Follow system preference' },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      if (theme.id === 'system') {
                        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        setTheme(systemPrefersDark ? 'dark' : 'light');
                      } else {
                        setTheme(theme.id);
                      }
                    }}
                    className={cn(
                      "p-6 rounded-xl border-2 transition-all text-left",
                      (theme.id === 'light' && !isDark) || (theme.id === 'dark' && isDark)
                        ? "border-primary-500 glass-primary"
                        : "border-white/20 dark:border-white/10 glass-secondary hover:glass-primary"
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={cn(
                        "p-2 rounded-lg",
                        (theme.id === 'light' && !isDark) || (theme.id === 'dark' && isDark)
                          ? "bg-primary-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      )}>
                        <theme.icon className="text-sm" />
                      </div>
                      <h4 className="font-semibold text-text-primary">{theme.label}</h4>
                    </div>
                    <p className="text-sm text-text-secondary">{theme.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Interface Options
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl glass-secondary">
                  <div>
                    <p className="font-medium text-text-primary">Reduced Motion</p>
                    <p className="text-sm text-text-secondary">Minimize animations and transitions</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl glass-secondary">
                  <div>
                    <p className="font-medium text-text-primary">High Contrast</p>
                    <p className="text-sm text-text-secondary">Increase contrast for better visibility</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Language
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Currency
                </label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Timezone
                </label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                  <option value="CET">Central European Time</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl glass-secondary border border-yellow-500/20">
              <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center">
                <FaDatabase className="mr-2 text-yellow-500" />
                Data Management
              </h3>
              <p className="text-text-secondary mb-4">
                Manage your data and account information. These actions cannot be undone.
              </p>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Clear Cache
                </Button>
                <Button variant="ghost" className="w-full justify-start text-error-600 hover:text-error-700">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary">
            Manage your account preferences and privacy settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-primary rounded-2xl p-6 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      activeTab === tab.id
                        ? "glass-secondary border border-primary-500/20 text-primary-600 dark:text-primary-400"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5 dark:hover:bg-white/5"
                    )}
                  >
                    <tab.icon className="text-sm flex-shrink-0" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="glass-primary rounded-2xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : saveSuccess ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    <FaSave className="text-sm" />
                  )}
                  <span>
                    {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
                  </span>
                </Button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;