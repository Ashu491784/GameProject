import { useState } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

const Pantry = ({ currentChallenge, selectedItems, addItem, muted }) => {
    const categories = ['vegetables', 'proteins', 'spices', 'grains', 'others'];
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const foodItems = {
        vegetables: [
            { id: 'v1', type: 'vegetables', name: 'Onion', flavor: 'savory', points: 10 },
            { id: 'v2', type: 'vegetables', name: 'Tomato', flavor: 'umami',  points: 8 },
            { id: 'v3', type: 'vegetables', name: 'Carrot', flavor: 'sweet',  points: 9 },
            { id: 'v4', type: 'vegetables', name: 'Spinach', flavor: 'bitter',  points: 12 }
        ],
        proteins: [
            { id: 'p1', type: 'proteins', name: 'Chicken', flavor: 'umami', points: 15 },
            { id: 'p2', type: 'proteins', name: 'Egg', flavor: 'umami',  points: 10 },
            { id: 'p3', type: 'proteins', name: 'Tofu', flavor: 'neutral', points: 8 },
            { id: 'p4', type: 'proteins', name: 'Lentils', flavor: 'earthy',  points: 12 }
        ],
        spices: [
            { id: 's1', type: 'spices', name: 'Curry Powder', flavor: 'spicy', color: 'yellow', points: 10 },
            { id: 's2', type: 'spices', name: 'Turmeric', flavor: 'earthy', color: 'yellow', points: 8 },
            { id: 's3', type: 'spices', name: 'Salt', flavor: 'salty', color: 'white', points: 6 },
            { id: 's4', type: 'spices', name: 'Pepper', flavor: 'spicy', color: 'black', points: 7 }
        ],
        grains: [
            { id: 'g1', type: 'grains', name: 'Rice', flavor: 'neutral', color: 'white', points: 10 },
            { id: 'g2', type: 'grains', name: 'Flour', flavor: 'neutral', color: 'white', points: 9 },
            { id: 'g3', type: 'grains', name: 'Bread', flavor: 'yeasty', color: 'brown', points: 8 },
            { id: 'g4', type: 'grains', name: 'Pasta', flavor: 'neutral', color: 'yellow', points: 9 }
        ],
        others: [
            { id: 'o1', type: 'others', name: 'Coconut Milk', flavor: 'creamy',  points: 12 },
            { id: 'o2', type: 'others', name: 'Oil', flavor: 'neutral', points: 6 },
            { id: 'o3', type: 'others', name: 'Cheese', flavor: 'salty',  points: 10 },
            { id: 'o4', type: 'others', name: 'Chocolate', flavor: 'sweet', points: 10 }
        ]
    };

    const playSelectedSound = () => {
        if (!muted) {
            const sound = new Howl({
                src: ['/sounds/select.mp3'],
                volume: 0.4
            });
            sound.play();
        }
    };

    const isItemSelected = (item) => {
        return selectedItems.some(selected => selected.type === item.type && selected.id === item.id);
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <div className="flex justify-center mb-6 flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300
                            ${activeCategory === category
                                ? 'bg-pink-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-pink-100'}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {foodItems[activeCategory].map(item => (
                    <motion.div
                        key={item.id}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 shadow-md 
                            ${isItemSelected(item)
                                ? 'bg-pink-50 border-pink-400 scale-105'
                                : 'bg-white border-gray-200 hover:shadow-lg hover:border-pink-300'}`}
                        onClick={() => {
                            playSelectedSound();
                            addItem(item);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        <div className="w-12 h-12 mb-3 rounded-full mx-auto bg-pink-100 flex items-center justify-center text-sm font-bold text-pink-700">
                            {item.name[0]}
                        </div>
                        <h4 className="text-lg font-semibold text-center">{item.name}</h4>
                        <p className="text-sm text-center text-gray-600">Flavor: {item.flavor}</p>
                        <p className="text-center text-pink-500 font-bold mt-2">+{item.points} pts</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Pantry;
