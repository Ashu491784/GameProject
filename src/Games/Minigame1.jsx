import React from 'react';

const GameCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 font-sans">
      <div className="perspective-1000 w-full max-w-2xl">
        <div className="group w-full transform-3d">
          <div className="relative transform-3d transition-all duration-700 group-hover:rotate-x-10 group-hover:-translate-y-5">
            {/* Card Background with Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-700/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
              {/* Card Header with Game Info */}

              
              {/* Game Image with Floating Animation */}
  <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
<div className='grid grid-cols-2 gap-4 mb-8'>
</div>
</div>
              
      {/* game small card */}
  <div className="p-8">
        <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">MoP MoB MinS</h2>
                    <p className="text-gray-400">Simple thing and small knowledge mini game...🍀</p>
        </div>
    </div>
  
  <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '🍫', text: 'Chocolute' },
                    { icon: '🧁', text: 'Vanilla' },
                    { icon: '🍓', text: 'Strowberry' },
                    { icon: '🍒🍏', text: 'Fruit and Nut' }
                  ].map((feature, index) => (
        <div key={index} className="flex items-center bg-gray-800/50 p-3 rounded-xl hover:bg-gray-700/50 transition-all">
                      <span className="text-2xl mr-3">{feature.icon}</span>
                      <span className="text-gray-300">{feature.text}</span>
        </div>
                  ))}
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
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-500 rounded-full opacity-20 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-green-500 rounded-full opacity-20 animate-float animation-delay-4000"></div>
    </div>
  );
};

export default GameCard;