import React, { useState } from 'react';

const GameCard = () => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);

  const toggleFlavor = (flavor) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor)
        ? prev.filter((f) => f !== flavor)
        : [...prev, flavor]
    );
  };

  const flavorOptions = [
    { icon: '🍫', text: 'Chocolate' },
    { icon: '🧁', text: 'Vanilla' },
    { icon: '🍓', text: 'Strawberry' },
    { icon: '🍒🍏', text: 'Fruit and Nut' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 font-sans">
      <div className="perspective-1000 w-full max-w-2xl">
        <div className="group w-full transform-3d">
          <div className="relative transform-3d transition-all duration-700 group-hover:rotate-x-10 group-hover:-translate-y-5">
            {/* Card Background with Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-700/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
              {/* Card Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">LeT MaKe Ice🍦</h2>
                    <p className="text-gray-400">Simple thing and small knowledge mini game...🍀</p>
                  </div>
                </div>

                {/* Flavor Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {flavorOptions.map((feature, index) => {
                    const isSelected = selectedFlavors.includes(feature.text);
                    return (
                      <div
                        key={index}
                        onClick={() => toggleFlavor(feature.text)}
                        className={`cursor-pointer flex items-center p-3 rounded-xl transition-all 
                          ${isSelected ? "bg-green-600" : "bg-gray-800/50 hover:bg-gray-700/50"}`}
                      >
                        <span className="text-2xl mr-3">{feature.icon}</span>
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Flavor Preview */}
                <div className="mb-6">
                  <h3 className="text-white text-lg font-semibold mb-2">🍦 Selected Flavors:</h3>
                  <p className="text-gray-200">{selectedFlavors.join(', ') || "None"}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group-hover:scale-105">
                    NEW GAME
                  </button>
                  <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white w-14 h-14 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span className="text-xl">❤</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default GameCard;