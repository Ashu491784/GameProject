import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <main className="relative w-full h-screen overflow-hidden flex justify-center items-center">
  <div className="relative w-full h-full" style={{backgroundImage: "url('/images/ui3.png')", backgroundSize: "cover", backgroundPosition: "center"}}></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-10"></div>

      <div className="absolute bottom-[6%] flex flex-col items-center gap-6 text-center px-4">
        <img
          src="/images/illu-text.png"
          alt="Illu-text"
          className="md:w-[30rem] w-[20rem] drop-shadow-lg"
        />

        <h1 className="md:text-3xl text-xl font-bold text-white tracking-wide">
          Explore, Capture, Conquer
        </h1>

        <div className="md:w-[75%] w-[60%] h-[1px] bg-gradient-to-r from-purple-400 to-indigo-400"></div>

        <button
          onClick={handleClick}
          className="h-12 px-14 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-xl font-semibold text-white tracking-wider shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300"
        >
          PLAY NOW
        </button>

        <div className="flex items-center gap-4 text-3xl font-extrabold text-gray-100 drop-shadow-md">
          <img
            className="md:h-16 h-12"
            src="/images/illu-logo.png"
            alt="Illu-logo"
          />{" "}
          ZERO
        </div>

        <p className="max-w-[90%] md:max-w-[60%] text-sm md:text-base text-gray-300 leading-relaxed">
          ⚠️ Notice: Illuvium Game is currently in Beta. Participation involves
          risk. Please read our full Disclaimer before proceeding.
        </p>
      </div>
    </main>
  );
};

export default Hero;
