import React from "react";
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import RecentListings from "../components/RecentListings";
import PetHeroes from "../components/PetHeroes";
import WhyAdopt from "../components/WhyAdopt";
import Loading from "../components/Loading";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Banner />
      <CategorySection />
      <RecentListings />
      <WhyAdopt />
      <PetHeroes />
      <Loading />
    </div>
  );
};

export default Home;
