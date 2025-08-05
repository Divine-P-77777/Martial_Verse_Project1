import { Parallax } from 'react-parallax';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { useSelector } from "react-redux";

import moon from '../../../assets/moon.jpg';
import moonlight from '../../../assets/moonlight.jpg';
import itachi from '../../../assets/itachi.png';
import itachilight from '../../../assets/itachilight.png';
import cloud from '../../../assets/cloud.png';

// Import Japanese display font (M PLUS Rounded 1c)
const japaneseFont = "'M PLUS Rounded 1c', 'Noto Sans JP', 'Zen Tokyo Zoo', sans-serif";

const Hero = () => {
  const containerRef = useRef(null);
  const itachiRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0 });
  const controls = useAnimation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width, left } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width;
      setTilt({ x });
    };

    const node = containerRef.current;
    node.addEventListener('mousemove', handleMouseMove);
    return () => node.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });

    gsap.fromTo(
      itachiRef.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 2, ease: 'power3.out' }
    );
  }, [controls]);


  const handleHomeClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      {/* Parallax Moon Background */}
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full min-h-screen z-0"
      >
        <Parallax
          bgImage={isDarkMode ? moon : moonlight }
          strength={100}
          className="w-full min-h-screen bg-center bg-cover"
          bgImageStyle={{
            objectFit: 'cover',
            objectPosition: 'top center',
            width: '100vw',
            height: '100vh',
            minHeight: '100vh',
          }}
        />
        {!isDarkMode && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-[1] transition-opacity duration-1000"></div>
        )}
      </motion.div>

      {/* Clouds */}
      <Parallax strength={300} className="absolute top-0 left-0 w-full h-full z-10">
        <motion.img
          src={cloud}
          alt="cloud-left"
          className="absolute left-0 top-1/4 w-1/2 max-w-[150px] md:max-w-md opacity-100"
          style={{ transform: `translate(${tilt.x * 15}px, 0px)` }}
        />
        <motion.img
          src={cloud}
          alt="cloud-right"
          className="absolute right-0 top-1/3 w-1/2 max-w-[150px] md:max-w-md scale-x-[-1] opacity-100"
          style={{ transform: `translate(${tilt.x * -15}px, 0px)` }}
        />
      </Parallax>

      {/* Welcome Text & Character */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center text-center"
      >
     <motion.h1
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1.2 }}
  className="text-xl md:text-4xl  mozilla-headline-400"

>
  <span className={`${isDarkMode ? 'text-black' : 'text-white'}`}>
    Welcome to the <span className={`${isDarkMode ? 'text-red-600' : 'text-red-500'}`}>Martial</span>Verse
  </span>
</motion.h1>


        <motion.img
          ref={itachiRef}
          src={isDarkMode ? itachi  :  itachilight}
          alt="itachi"
          className="max-w-[500px] md:max-w-[680px]"
          style={{ transform: `translate(${tilt.x * 5}px, 0px)` }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;