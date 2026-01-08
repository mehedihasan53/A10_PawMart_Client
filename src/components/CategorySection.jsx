import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaDog, FaDrumstickBite, FaBaby, FaPills } from "react-icons/fa";
import Card from "./ui/Card";

const categories = [
  { 
    name: "pets", 
    label: "Pets (Adoption)", 
    icon: FaDog, 
    description: "Find your perfect companion",
    color: "from-blue-500 to-purple-500",
    bgColor: "from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
  },
  { 
    name: "food", 
    label: "Pet Food", 
    icon: FaDrumstickBite, 
    description: "Nutritious meals for pets",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950"
  },
  { 
    name: "accessories", 
    label: "Accessories", 
    icon: FaBaby, 
    description: "Toys, beds, and more",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950"
  },
  { 
    name: "care", 
    label: "Pet Care Products", 
    icon: FaPills, 
    description: "Health and wellness items",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950"
  },
];

const CategorySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="py-7 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-950/30 dark:to-secondary-950/30" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 glass-secondary rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200/30 dark:border-primary-700/30 mb-6">
            🏪 Shop by Category
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text-primary">Explore Our</span>
            <br />
            <span className="text-light-text-primary dark:text-dark-text-primary">Categories</span>
          </h2>
          
          <p className="text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover everything your pet needs in our carefully curated categories. 
            From adoption to accessories, we've got you covered.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={`/category-filtered-product/${category.name}`}>
                  <Card
                    variant="glass"
                    padding="lg"
                    className="h-full group cursor-pointer relative overflow-hidden"
                    hover={false}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Icon container */}
                      <div className="relative mb-6">
                        <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.color} p-4 group-hover:scale-110 transition-all duration-500 shadow-glass`}>
                          <IconComponent className="w-full h-full text-white" />
                        </div>
                        
                        {/* Floating particles */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300" style={{ animationDelay: '0.1s' }} />
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300" style={{ animationDelay: '0.3s' }} />
                      </div>

                      {/* Text content */}
                      <h3 className="text-xl font-bold mb-3 text-light-text-primary dark:text-dark-text-primary group-hover:gradient-text-primary transition-all duration-300">
                        {category.label}
                      </h3>
                      
                      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary transition-colors duration-300">
                        {category.description}
                      </p>

                      {/* CTA Button */}
                      <div className="inline-flex items-center px-6 py-3 glass-tertiary rounded-2xl group-hover:glass-primary transition-all duration-300 group/btn">
                        <span className="font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                          Explore
                        </span>
                        <motion.span
                          className="ml-2 text-primary-600 dark:text-primary-400"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mt-16"
        >
          <div className="glass-secondary rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text-primary">
              Can't find what you're looking for?
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Browse our complete collection of pets and supplies
            </p>
            <Link
              to="/pets-supplies"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg group"
            >
              View All Products
              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
