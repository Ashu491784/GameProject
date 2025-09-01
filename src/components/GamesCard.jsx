import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaSearch, FaShoppingCart, FaUser, FaGamepad } from "react-icons/fa";
import { Link} from "react-router-dom";
import Payment from "./payment";

const GamesCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const gameCategories = [
    "all", "shooting", "puzzle", "runner", "sports", "casual", "strategy"
  ];

  const cardImages = [
    {id: 1, src: "/images/pubgy.jpeg", text: "This is a best shooting game in the world", price: "$12", rating: 4, category: "shooting", downloads: "100M+"},
    {id: 2, src: "/images/royalmatch.jpeg", text: "Royal match is best game of childrens", price: "$10", rating: 5, category: "puzzle", downloads: "50M+"},
    {id: 3, src: "/images/Tounship.jpeg", text: "This is a Tounship game and best clash game", price: "$8", rating: 4, category: "strategy", downloads: "75M+"},
    {id: 4, src: "/images/candycrush.jpeg", text: "Candy crush game is lighting candy game.", price: "$5", rating: 3, category: "puzzle", downloads: "500M+"},
    {id: 5, src: "/images/angrybird.jpeg", text: "Angry bird is best blass power full bird game", price: "$13", rating: 4, category: "casual", downloads: "200M+"},
    {id: 6, src: "/images/templeruns.jpeg", text: "Temple run is the most famouse runner game.", price: "$8", rating: 5, category: "runner", downloads: "300M+"},
    {id: 7, src: "/images/lood.jpeg", text: "Pool Game is the best ball game", price: "$3", rating: 3, category: "sports", downloads: "45M+"},
    {id: 8, src: "/images/templerun.jpeg", text: "Next lavel game of temple run", price: "$2.5", rating: 5, category: "runner", downloads: "80M+"},
    {id: 9, src: "/images/frifire.jpeg", text: "Best shooting game is frifire", price: "$6.2", rating: 5, category: "shooting", downloads: "250M+"},
    {id: 10, src: "/images/clashof.jpeg", text: "Next lavel shooting game.", price: "$5", rating: 4, category: "shooting", downloads: "150M+"},
    {id: 11, src: "/images/cook.jpeg", text: "Best cookin game for cute girls", price: "$9", rating: 5, category: "casual", downloads: "30M+"},
    {id: 12, src: "/images/bubble.jpeg", text: "You can shoot boobless.", price: "$4", rating: 2, category: "puzzle", downloads: "25M+"},
    {id: 13, src: "/images/makeup2.jpeg", text: "Makeup game for creative minds", price: "$12", rating: 3, category: "casual", downloads: "20M+"},
    {id: 14, src: "/images/tom.jpeg", text: "Girls makeup game for girls and chidrens", price: "$10", rating: 4, category: "casual", downloads: "35M+"},
    {id: 15, src: "/images/vita.jpeg", text: "Hakuna Matata vibes with friends.", price: "$8", rating: 4, category: "casual", downloads: "40M+"},
    {id: 16, src: "/images/sniper.jpeg", text: "Sniper elite shooting experience", price: "$6", rating: 5, category: "shooting", downloads: "90M+"},
    {id: 17, src: "/images/swim.jpg", text: "Swimming challenge adventure", price: "$4", rating: 3, category: "sports", downloads: "15M+"},
    {id: 18, src: "/images/pool.jpg", text: "Pool master - play with friends", price: "$5.3", rating: 3, category: "sports", downloads: "28M+"},
    {id: 19, src: "/images/food.jpeg", text: "Cooking fever - chef's edition", price: "$2", rating: 2, category: "casual", downloads: "18M+"},
    {id: 20, src: "/images/car.jpeg", text: "Racing madness on wheels", price: "$7", rating: 5, category: "sports", downloads: "120M+"},
  ];

  // Filter and sort games
  const filteredGames = cardImages
    .filter(game => {
      const matchesSearch = game.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1));
      if (sortBy === "price-high") return parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1));
      if (sortBy === "rating") return b.rating - a.rating;
      return b.downloads.localeCompare(a.downloads);
    });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(243,0,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,212,255,.25),transparent_35%)] text-white overflow-hidden">
      <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg">
          Discover Amazing Games
        </h2>
        <p className="mt-2 text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Explore our collection of the best games for all ages and preferences. Find your next adventure today!
        </p>
      </div>

      {/* searchbar */}
      <div className="max-w-screen-2xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center items-center bg-gray-800 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Category:</span>
            <select 
              className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {gameCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Sort by:</span>
            <select 
              className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
            <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-40 md:w-56"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              <FaShoppingCart />
            </button>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              <FaUser />
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            {filteredGames.length} games found
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {filteredGames.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 flex flex-col h-full shadow-blue-500/30 cursor-pointer"
              whileHover={{ scale: 1.07}}
              initial={{ opacity: 0, scale: 0.7, y: 0 }}
              animate={{ opacity: 1,scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Game Image */}
              <div className="relative pt-[70%]">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                <div className="absolute top-2 right-2 bg-purple-600 text-xs px-2 py-1 rounded-md z-20">
                  {item.category}
                </div>
                <img
                  src={item.src}
                  alt={item.text}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">
                  {item.text}
                </h3>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-purple-400 font-bold">{item.price}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar 
                        key={index} 
                        className={index < item.rating ? "text-yellow-400" : "text-gray-600"} 
                        size={14}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 mt-2">
                  {item.downloads} downloads
                </div>
               
                 <button  className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-600 transition-all">
                <Link to="/Payment">Add to Cart</Link>   
                </button>
               
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <FaSearch size={48} className="mx-auto mb-4" />
            <h3 className="text-xl">No games found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesCard;