import React from "react";
import { FaPaw } from "react-icons/fa";

const heroes = [
  {
    name: "Siam Rahman",
    role: "Adopted 12+ Rescued Pets",
    image:
      "https://imgcdn.stablediffusionweb.com/2025/1/19/7446a89d-4060-4eed-b51e-5b70d931ee2f.jpg",
    quote: "Every rescued pet deserves patience, love, and a warm home.",
  },
  {
    name: "Maya Chowdhury",
    role: "Street Animal Care Volunteer",
    image:
      "https://www.shutterstock.com/image-photo/side-view-friendly-new-female-600nw-2324044919.jpg",
    quote: "Caring for animals isn’t charity — it’s humanity.",
  },
  {
    name: "Arif Hossain",
    role: "Pet Shelter Organizer",
    image:
      "https://www.shutterstock.com/image-photo/male-veterinarian-pug-dog-on-260nw-2562563655.jpg",
    quote:
      "Saving one animal won’t change the world, but for that animal, the world changes forever.",
  },
];

const PetHeroes = () => {
  return (
    <section className="pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-3 mb-10">
          <FaPaw className="text-orange-500 text-3xl" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Meet Our Pet Heroes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {heroes.map((hero, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 text-center "
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-orange-400 mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800">
                {hero.name}
              </h3>

              <p className="text-orange-500 text-sm mt-1">{hero.role}</p>

              <p className="text-gray-600 mt-3 italic leading-relaxed">
                “{hero.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetHeroes;
