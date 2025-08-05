import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const quotes = [
  'The more you sweat in training, the less you bleed in battle.',
  "Boards don't hit back. — Bruce Lee",
  'Pain is weakness leaving the body.',
  'In martial arts, the biggest opponent is yourself.'
];

const martialArts = [
  'Karate', 'Kung Fu', 'Taekwondo', 'Muay Thai', 'Jiu-Jitsu', 'Aikido', 'Capoeira',
  'Silat', 'Krav Maga', 'Boxing', 'Kickboxing'
];

const QuoteSection = () => {
  const [index, setIndex] = useState(0);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bgClass = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <section className={`relative py-16 px-6 overflow-hidden font-[Merriweather] ${bgClass}`}>
      {/* Top Marquee */}
      <div className="absolute top-4 left-0 w-full overflow-hidden">
        <div className="animate-marquee-left whitespace-nowrap text-lg md:text-2xl tracking-wide uppercase opacity-50">
          {martialArts.map((art, i) => (
            <span key={i} className="inline-block mx-6">{art}</span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={quotes[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-5xl font-semibold italic max-w-3xl"
          >
            “{quotes[index]}”
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-4 left-0 w-full overflow-hidden">
        <div className="animate-marquee-right whitespace-nowrap text-lg md:text-2xl tracking-wide uppercase opacity-50">
          {martialArts.map((art, i) => (
            <span key={i} className="inline-block mx-6">{art}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;

