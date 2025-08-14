import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FirstScrean = () => {
  const navigate = useNavigate();

  const cardData = [
    { title: "LionKing", video: "/videos/bento-card4.mp4", link: "/login" },
    {
      title: "Dragon Vibe",
      video: "/videos/bento-card3.mp4",
      link: "/NatureGlow",
    },
    {
      title: "Green Vibes",
      video: "/videos/bento-card5.mp4",
      link: "/GreenVibes",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-10">
        {/* Logo */}
        <div className="flex lg:gap-14 gap-4 items-center mb-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="md:w-20 w-14 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            src="/images/logoss.png"
            alt="logo-img"
          />
        </div>

        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-extrabold text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-orange-300 to-green-600 drop-shadow-xl tracking-wider"
          >
            W E L C O M E
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-4 text-lg sm:text-2xl font-medium text-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 drop-shadow-lg max-w-2xl"
          >
            Choose Your Background & enjoy new features with premium themes 🪴
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate(card.link)}
              className="relative overflow-hidden  border  border-cyan-400 rounded-xl  shadow-lg aspect-square cursor-pointer"
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={card.video}
              ></video>
              <div className="absolute inset-0 bg-black/20" />
              <h1 className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white font-extrabold text-xl drop-shadow-lg">
                {card.title}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstScrean;
