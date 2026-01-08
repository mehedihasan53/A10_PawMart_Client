import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapPin, Tag, Heart } from "lucide-react";
import Loading from "./Loading";

const RecentListings = () => {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const res = await axios.get(
          "https://pawmart-server-ebon.vercel.app/recent-listings"
        );
        setRecent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRecent();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements - matching CategorySection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-950/30 dark:to-secondary-950/30" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 glass-secondary rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200/30 dark:border-primary-700/30 mb-6">
            🐾 Latest Arrivals
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text-primary">Recent</span>
            <br />
            <span className="text-light-text-primary dark:text-dark-text-primary">Listings</span>
          </h2>
          
          <p className="text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover the newest pets looking for their forever homes. 
            Each one is waiting for a loving family to call their own.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((item, index) => (
            <div 
              key={item._id} 
              className="glass-primary rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-glass-lg group hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button className="absolute top-4 right-4 p-2 glass-secondary rounded-full border border-white/20 dark:border-white/10 text-text-secondary hover:text-error-500 hover:scale-110 transition-all duration-300">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary group-hover:gradient-text-primary transition-all duration-300">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <div className="p-1.5 glass-tertiary rounded-lg border border-white/10">
                    <Tag className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{item.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    {item.price === 0 ? (
                      <span className="glass-secondary px-3 py-1.5 rounded-full text-sm font-semibold text-success-600 border border-success-200/40 dark:border-success-700/40">
                        Free Adoption
                      </span>
                    ) : (
                      <span className="gradient-text-primary text-xl font-bold">${item.price}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <div className="p-1.5 glass-tertiary rounded-lg border border-white/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{item.location}</span>
                </div>

                <Link to={`/listing-details/${item._id}`} className="block mt-6">
                  <button className="w-full btn-gradient-primary py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-primary">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {recent.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="glass-primary rounded-3xl p-12 border border-white/20 dark:border-white/10 max-w-md mx-auto">
              <div className="text-6xl mb-6">🐾</div>
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                No Recent Listings
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Check back soon for new pets looking for homes!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;