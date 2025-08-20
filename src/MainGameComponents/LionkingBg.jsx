import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LionKingBg = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [open, setopen] = useState(false);
  const [show, setshow] = useState(false);

  const cardImages = [
    "/images/l6.png",
    "/images/l1.png",
    "/images/l2.png",
    "/images/l3.png",
    "/images/l4.png",
    "/images/l5.png",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    console.log("Start Now clicked");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(243,0,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,212,255,.25),transparent_35%)]">
    
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="absolute top-10 text-4xl md:text-6xl font-extrabold text-white text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-500">
                LION
              </span>{" "}
              vs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-gray-950">
                YOU
              </span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        <div className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-r from-[#151536] via-[#101028] to-[#0b0b14] border border-white/10 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center"
            >
              <div className="flex justify-center items-center mb-6">
                <motion.img
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="md:w-20 w-14 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  src="/images/iconLionKing.png"
                  alt="logo-img"
                />
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2 leading-tight">
                LION{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">
                  KING
                </span>
              </h1>

              <p className="text-white/70 mt-3 max-w-xl mx-auto">
                You can play with others or against the computer... Lion King is
                Now legend...!!!
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  className="px-5 py-2.5 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    handleStartClick();
                    setshow(true);
                  }}
                >
                  Start Now
                </button>

                {show && (
                 <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="absolute top-10 text-4xl md:text-6xl font-extrabold text-white text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-500">
                LION
              </span>              <motion.img
            src="/images/lion1.png"
            alt="lion-left"
            initial={{ opacity: 0, x: -80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="absolute left-10 bottom-10 md:w-60 w-40 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />{" "}
              vs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-gray-950">
                YOU 
              </span>
                <motion.img
            src={cardImages[mainImageIndex]}
            alt="lion-right"
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="absolute right-0 bottom-5 left-auto md:w-60 w-40 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>

         
          <motion.img
            src="/images/lion1.png"
            alt="lion-left"
            initial={{ opacity: 0, x: -80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="absolute left-10 bottom-10 md:w-60 w-40 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />

          <motion.img
            src={cardImages[mainImageIndex]}
            alt="lion-right"
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="absolute right-0 bottom-5 left-auto md:w-60 w-40 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 p-6">
        {cardImages.map((img, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4.4/4] md:col-span-1 bg-gradient-to-br from-blue-500/40 via-cyan-500/30 to-teal-500/40 shadow-lg shadow-blue-500/20 cursor-pointer"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setMainImageIndex(i)}
          >
            <img
              src={img}
              alt={`Thumbnail ${i}`}
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Rules Modal */}
      <div className="flex flex-col items-center">
        <button
          className="text-center mt-6 px-5 py-2.5 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10"
          onClick={() => setopen(true)}
        >
          Check Details
        </button>

        {open && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="backdrop-blur-3xl p-6 rounded-lg w-80">
              <h2 className="text-2xl font-bold text-white">Rules:-</h2>
              <ul className="mt-4 text-gray-300 list-disc pl-5">
                <li>dcfgvhbjn</li>
                <li>dcfgvhbjn</li>
                <li>dcfgvhbjn</li>
                <li>dcfgvhbjn</li>
                <li>dcfgvhbjn</li>
                <li>dcfgvhbjn</li>
              </ul>
              <button
                className="text-center mt-6 px-5 py-2.5 rounded-xl font-semibold border border-x-blue-300 border-y-blue-400 text-white hover:bg-white/10"
                onClick={() => setopen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LionKingBg;
