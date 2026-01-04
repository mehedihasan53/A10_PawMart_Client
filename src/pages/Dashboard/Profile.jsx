import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useRole from "../../hooks/useRole";
import {
  FaEnvelope,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaFingerprint,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f1a] py-10 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#151c2c] rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
          <div className="h-32 bg-gradient-to-r from-orange-500 to-rose-500 opacity-90"></div>

          <div className="px-6 md:px-16 pb-12">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 gap-6 md:gap-8">
              <div className="relative shrink-0">
                <div className="p-2 bg-white dark:bg-[#151c2c] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[1.8rem] md:rounded-[2rem] object-cover ring-2 ring-orange-50 dark:ring-orange-900/20"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-green-500 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-white dark:border-[#151c2c] animate-pulse"></div>
              </div>

              <div className="flex-1 text-center md:text-left min-w-0">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-3">
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter truncate max-w-full">
                    {user?.displayName || "Anonymous User"}
                  </h2>
                  <FaCheckCircle className="text-blue-500 text-xl md:text-2xl shrink-0" />
                </div>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                  <span className="bg-orange-600 text-white px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">
                    {role || "Member"}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-xs md:text-sm break-all">
                    <FaEnvelope className="text-orange-500 shrink-0" />
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#1e273a] p-4 rounded-3xl border border-gray-100 dark:border-gray-700 text-center min-w-[120px] shrink-0">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Trust Score
                </p>
                <div className="flex items-center justify-center gap-1 text-orange-500 font-black text-xl">
                  <FaStar size={16} /> 9.8
                </div>
              </div>
            </div>

            <hr className="my-10 border-gray-100 dark:border-gray-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-[#1e273a] border border-gray-100 dark:border-gray-700">
                <FaFingerprint className="text-orange-500 text-2xl mb-4 opacity-50" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Account Hash
                </p>
                <p className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 break-all">
                  {user?.uid?.toUpperCase() || "N/A"}
                </p>
              </div>

              <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-[#1e273a] border border-gray-100 dark:border-gray-700">
                <FaClock className="text-blue-500 text-2xl mb-4 opacity-50" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Active Since
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                  Jan 2026
                </p>
              </div>

              <div className="p-6 rounded-[2rem] bg-orange-600 border border-orange-500 text-white shadow-lg shadow-orange-600/20 sm:col-span-2 md:col-span-1">
                <FaShieldAlt className="text-2xl mb-4 opacity-80" />
                <p className="text-[10px] font-black text-orange-200 uppercase tracking-widest mb-1">
                  Security Level
                </p>
                <p className="text-sm font-black flex items-center gap-2">
                  ULTRA SECURE <FaCheckCircle className="text-white" />
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-400 dark:text-gray-600 text-[10px] md:text-xs font-medium italic leading-relaxed">
                Verified digital identity secured by PawMart blockchain
                protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
