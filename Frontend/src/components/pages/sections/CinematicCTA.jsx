
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import karate from "../../../assets/karate.mp4"
import { useRef } from 'react';
import {Link} from "react-router-dom"

const CinematicCTA = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const bgColor = isDarkMode ? 'bg-black' : 'bg-[#f8f4ec]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const gold = 'text-[#FFD700]';
 const videoRef = useRef(null);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    videoRef.current?.pause();
  };
  return (
    <section className={`relative px-6 py-20 ${bgColor} ${textColor} text-center font-[Inter]`}>
      <motion.h2
        className={`text-3xl md:text-5xl font-[Cinzel] font-bold mb-4 ${gold}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Awaken the <span className='text-red-400'>Warrior</span> Within
      </motion.h2>

      <motion.p
        className="mt-2 text-lg md:text-xl font-light max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Explore centuries of discipline, philosophy, and combat mastery. Your path begins here.
      </motion.p>

      <motion.div className='mx-auto flex items-center justify-center'>
          <video
      ref={videoRef}
      className="w-[200px] h-full object-cover rounded-2xl"
      src={karate}
      loop
      muted
      playsInline
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
      </motion.div>

      <motion.div
        className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a
          href="/playlists"
              className="border border-[#FFD700] text-[#FFD700] px-6 py-3 rounded-2xl hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-md"
 
        >
          🥋 Browse Playlists
        </a>
        <a
          href="/blog"
               className="bg-[#ff5729] text-black font-semibold px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          📖 Read the Blog
        </a>
      </motion.div>

      <motion.p
        className="mt-10 text-sm italic text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Want to publish your own thoughts or stories?
        <Link
          to="/accessrequest"
          className="text-[#FFD700] underline ml-1"
        >
          Fill this short form
        </Link>{' '}
        — we’ll connect with you soon.
      </motion.p>
    </section>
  );
};

export default CinematicCTA;
