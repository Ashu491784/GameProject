import { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import { Link} from "react-router-dom";

const Arena = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardHover = (cardName) => {
    setActiveCard(cardName);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  const cards = [
    {
      id: 1,
      title: "NFT STORE",
      type: "image",
      src: "public/images/bento-card1.png",
      icon: "bx-store-alt",
      colSpan: "md:col-span-1",
      aspect: "aspect-[4.4/4]",
      description: "Explore our exclusive NFT marketplace"
    },
    {
      id: 2,
      title: "GALAXY VIEW",
      type: "video",
      src: "public/videos/bento-card2.mp4",
      colSpan: "md:col-span-1",
      aspect: "aspect-[4.5/4]",
      description: "Immerse yourself in cosmic wonders"
    },
    {
      id: 3,
      title: "Scoriox",
      type: "video",
      src: "public/videos/bento-card3.mp4",
      colSpan: "sm:col-span-1",
      aspect: "aspect-square",
      description: "Fiery adventure awaits"
    },
    {
      id: 4,
      title: "Floralynx",
      type: "video",
      src: "public/videos/bento-card4.mp4",
      colSpan: "sm:col-span-1",
      aspect: "aspect-square",
      description: "Nature's mysterious guardian"
    },
    {
      id: 5,
      title: "Titanor",
      type: "video",
      src: "public/videos/bento-card5.mp4",
      colSpan: "sm:col-span-1",
      aspect: "aspect-square",
      description: "Colossal mechanical marvel"
    },
    {
      id: 6,
      title: "EXCLUSIVE OFFER",
      type: "image",
      src: "public/images/bento-card5.png",
      icon: "bx-link-external",
      colSpan: "md:col-span-2",
      aspect: "aspect-[16/9]",
      description: "Limited time deals available now"
    }
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8 relative overflow-hidden">
      <video 
        src='public/videos/galaxy.mp4' 
        autoPlay 
        muted 
        loop
        playsInline
        className='w-full h-full object-cover fixed top-0 left-0 -z-20'
      />
      
      <div className="fixed inset-0 bg-black bg-opacity-40 -z-10"></div>
      
      <div className="relative z-10 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest mb-10 md:mb-16 text-white" 
            style={{textShadow: "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(167, 139, 250, 0.5)"}}>
          PLAYGROUND
        </h1>
        
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-2">
          Explore our interactive universe of digital experiences
        </p>
        <p className="text-sm text-blue-200 max-w-2xl mx-auto">
          Hover over cards for more information
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative z-10">
        

        <div className="md:col-span-1 space-y-5 md:space-y-6">
          {cards.slice(0, 2).map(card => (
            <div 
              key={card.id}
              className={`relative overflow-hidden rounded-3xl border-2 border-white/30 ${card.aspect} ${card.colSpan} transition-all duration-500 hover:border-purple-400 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30`}
              onMouseEnter={() => handleCardHover(card.title)}
              onMouseLeave={handleCardLeave}
            >
              {card.type === 'video' ? (
                <video className='w-full h-full object-cover' autoPlay loop muted playsInline src={card.src} />
              ) : (
                <img src={card.src} alt={card.title} className="w-full h-full object-cover" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h2 className="text-xl font-bold text-white mb-1">{card.title}</h2>
                <p className="text-blue-200 text-sm opacity-0 transition-opacity duration-300 hover:opacity-100">
                  {card.description}
                </p>
              </div>
              
              <button className='absolute bottom-0 left-0 right-0 h-14 bg-black/70 text-lg font-bold text-white hover:text-yellow-300 transition-all duration-300 flex items-center justify-center gap-2'>
                {card.icon && <i className={`bx ${card.icon}`}></i>}
                {card.title}
              </button>
              
              {activeCard === card.title && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-yellow-300 mb-2">{card.title}</h3>
                    <p className="text-blue-100">{card.description}</p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-colors">
                      Explore Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='md:col-span-2 space-y-5 md:space-y-6'>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6'>
            {cards.slice(2, 5).map(card => (
              <div 
                key={card.id}
                className={`relative overflow-hidden rounded-3xl border-2 border-white/30 ${card.aspect} ${card.colSpan} transition-all duration-500 hover:border-blue-400 hover:scale-[1.05] hover:shadow-2xl hover:shadow-blue-500/30`}
                onMouseEnter={() => handleCardHover(card.title)}
                onMouseLeave={handleCardLeave}
              >
                <video className='w-full h-full object-cover' autoPlay loop muted playsInline src={card.src} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <h2 className="text-lg font-bold text-white">{card.title}</h2>
                  <p className="text-blue-200 text-xs opacity-0 transition-opacity duration-300 hover:opacity-100">
                    {card.description}
                  </p>
                </div>
                
                {activeCard === card.title && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-3">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-yellow-300 mb-1">{card.title}</h3>
                      <p className="text-blue-100 text-sm">{card.description}</p>
                      <button className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-sm font-medium transition-colors">
                   <Link to="/MinigameScrean">  Discover</Link> 
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {cards.slice(5).map(card => (
            <div 
              key={card.id}
              className={`relative overflow-hidden rounded-3xl border-2 border-white/30 ${card.aspect} ${card.colSpan} transition-all duration-500 hover:border-green-400 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/30`}
              onMouseEnter={() => handleCardHover(card.title)}
              onMouseLeave={handleCardLeave}
            >
              <img src={card.src} alt={card.title} className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <h2 className="text-2xl font-bold text-white mb-1">{card.title}</h2>
                <p className="text-blue-200 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  {card.description}
                </p>
              </div>
              
              <button className='absolute bottom-0 left-0 right-0 h-16 bg-black/70 text-xl font-bold text-white hover:text-yellow-300 transition-all duration-300 flex items-center justify-center gap-2'>
                <i className={`bx ${card.icon}`}></i>
                {card.title}
              </button>
              
              {activeCard === card.title && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-5">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">{card.title}</h3>
                    <p className="text-blue-100 text-lg">{card.description}</p>
                    <button className="mt-4 px-8 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white font-medium transition-colors">
                    <Link to="/Payment"> Buy Now</Link> 
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-blue-200 text-sm pb-6 relative z-10">
        <p>© {new Date().getFullYear()} Playground • Explore our digital universe</p>
      </footer>
    </div>
  );
};

export default Arena;