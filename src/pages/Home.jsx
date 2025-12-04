import React from "react";
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import RecentListings from "../components/RecentListings";

const Home = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      <RecentListings />
    </div>
  );
};

export default Home;
