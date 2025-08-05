import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import juijitsu from "/culture/juijitsu.jpeg"
import karate from "/culture/karate.jpg"
import kungfu from "/culture/kungfuu.jpg"
import muaythai from "/culture/muaythai.jpg"
import taekwondo from "/culture/taekwondo.jpg"
import kalaripayattu from "/culture/kalaripayattu.jpg"



const martialArts = [
  {
    name: 'Karate',
    country: 'Japan',
    emoji: '⛩️',
    image: karate,
    fact: 'The ultimate aim lies not in victory or defeat, but in the perfection of character.',
  },
  {
    name: 'Taekwondo',
    country: 'Korea',
    emoji: '🇰🇷',
    image: taekwondo,
    fact: 'Taekwondo is a way of life, not just a sport.',
  },
  {
    name: 'Kung Fu',
    country: 'China',
    emoji: '🐉',
    image: kungfu,
    fact: 'Be soft like water, yet powerful enough to break stone.',
  },
  {
    name: 'Kalaripayattu',
    country: 'India',
    emoji: '🕉️',
    image: kalaripayattu, 
    fact: 'Kalaripayattu is one of the world’s oldest martial arts, blending yoga, movement, and weaponry.',
  },
  {
    name: 'Muay Thai',
    country: 'Thailand',
    emoji: '🥊',
    image: muaythai,
    fact: 'Eight limbs for one mind: fists, elbows, knees, and shins in harmony.',
  },
  {
    name: 'Jiu-Jitsu',
    country: 'Brazil',
    emoji: '🧷',
    image: juijitsu,
    fact: 'Use your opponent’s strength as their weakness.',
  },
];

const MartialCulture = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const bgColor = isDarkMode ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' : 'bg-gradient-to-br from-[#f9f9f9] via-white to-[#f0f0f0]';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-[#444]' : 'border-[#ddd]';

  return (
    <section className={`${bgColor} py-16 px-6 md:px-16`}>
      <h2 className={`text-4xl font-bold text-center ${textColor} mb-12 tracking-wide`}>Martial Culture</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 justify-center">
        {martialArts.map((art, i) => (
          <motion.div
            key={art.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08 }}
            className={`relative border ${borderColor} rounded-2xl shadow-xl h-[300px] overflow-hidden transition-all duration-300 cursor-pointer group`}
          >
     
            <img
              src={art.image}
              alt={art.name}
              className="absolute inset-0 w-full h-full object-cover opacity-"
            />

            
            <div className="absolute top-40   z-20 p-4 flex flex-col justify-between h-full">
              <div>
                <div className="text-5xl mb-2">{art.emoji}</div>
                <h3 className="text-xl font-semibold leading-tight mb-1">{art.name}</h3>
                <p className={`text-sm italic`}>{art.country}</p>
              </div>
            </div>

          
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 flex items-center justify-center px-6 text-center text-sm font-medium text-white bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 backdrop-blur-sm rounded-2xl"
            >
              {art.fact}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MartialCulture;
