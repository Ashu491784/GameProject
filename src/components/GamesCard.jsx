import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const GamesCard = () => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const cardImages = [
    {src: "/images/pubgy.jpeg",text: "This is a best shooting game in the world",price: "$12", rating: 4,},
    {src: "/images/royalmatch.jpeg",text: "Royal match is best game of childrens",price: "$10", rating: 5,},
    {src: "/images/Tounship.jpeg",text: "This is a Tounship game and best clash game",price: "$8",rating: 4,},
    {src: "/images/candycrush.jpeg",text: "Candy crush game is lighting candy game.",price: "$5",rating: 3,},
    {src: "/images/angrybird.jpeg",text: "Angry bird is best blass power full bird game",price: "$13",rating: 4,},
    {src: "/images/templeruns.jpeg",text: "Hakuna Matata vibes with friends.",price: "$8",rating: 5,},
    {src: "/images/lood.jpeg",text: "Hakuna Matata vibes with friends.",price: "$3",rating: 5,},
    {src: "/images/templerun.jpeg",text: "Hakuna Matata vibes with friends.",price: "$2.5",rating: 5,},
    {src: "/images/frifire.jpeg",text: "Hakuna Matata vibes with friends.",price: "$6.2",rating: 5,},
    {src: "/images/clashof.jpeg",text: "Hakuna Matata vibes with friends.",price: "$5",rating: 5,},
    {src: "/images/cook.jpeg",text: "Hakuna Matata vibes with friends.",price: "$9",rating: 5,},
    {src: "/images/bubble.jpeg",text: "Hakuna Matata vibes with friends.",price: "$4",rating: 5,},
    {src: "/images/makeup2.jpeg",text: "Hakuna Matata vibes with friends.",price: "$12",rating: 5,},
    {src: "/images/tom.jpeg",text: "Hakuna Matata vibes with friends.",price: "$10",rating: 5,},
    {src: "/images/vita.jpeg",text: "Hakuna Matata vibes with friends.",price: "$8",rating: 5,},
    {src: "/images/sniper.jpeg",text: "Hakuna Matata vibes with friends.",price: "$6",rating: 5,},
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(243,0,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,212,255,.25),transparent_35%)]">
      <div className="text-center mt-10 mb-0">
  <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg">
    Games
  </h2>
  <p className="mt-2 text-gray-300 text-sm md:text-base">
    Explore our collection of amazing games
  </p>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {cardImages.map((item, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/4] bg-transparent shadow-xl shadow-blue-500/30 cursor-pointer flex flex-col"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setMainImageIndex(i)}
          >
            {/* Image */}
            <div className="relative flex-grow">
              <img
                src={item.src}
                alt={`Thumbnail ${i}`}
                className="absolute inset-0 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover m-2 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
            <div className="px-4 bg-black/60 backdrop-blur-sm rounded-b-xl text-white text-sm md:text-base font-semibold shadow-lg">
              {item.text}
            </div>
             <div className="px-4 bg-black/60 backdrop-blur-sm rounded-b-xl text-white text-sm md:text-base font-semibold shadow-lg">
               {item.price}
            </div>
            <div className="p-3 bg-black/50 text-white text-sm md:text-base font-medium gap-2">
              <div className="flex mt-1">
                {[...Array(5)].map((star, index) => {
                  const starClass =
                    index < item.rating ? "text-yellow-400" : "text-gray-400";
                  return <FaStar key={index} className={starClass} />;
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GamesCard;
