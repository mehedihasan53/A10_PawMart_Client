import React from "react";
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import RecentListings from "../components/RecentListings";
import PetHeroes from "../components/PetHeroes";
import WhyAdopt from "../components/WhyAdopt";
import DynamicTitle from "../components/DynamicTitle";

const Home = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
      <DynamicTitle title="Home" />
      <Banner />
      <CategorySection />
      <RecentListings />
      <WhyAdopt />
      <PetHeroes />
    </div>
  );
};

export default Home;
