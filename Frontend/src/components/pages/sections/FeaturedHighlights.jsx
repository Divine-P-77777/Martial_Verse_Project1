import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredData = [
  {
    type: 'video',
    title: 'The Hidden Power of Kung Fu',
    thumbnail: 'https://wallpapercave.com/wp/fk6Tb0s.jpg',
    badge: 'History',
    link: 'https://youtu.be/01a2_6h1pUo?si=KWmX6z8ogZjVW3JO'
  },
  {
    type: 'blog',
    title: 'Taekwondo Kicks Explained',
    thumbnail: 'https://img.freepik.com/free-photo/full-shot-asian-man-practicing-taekwondo_23-2150260495.jpg',
    badge: 'Technique',
    link: '/blog'
  },
  {
    type: 'video',
    title: 'Muay Thai: Art of Eight Limbs',
    thumbnail: 'https://wallpaperbat.com/img/75255-wallpaper-fighter-muay-thai-kneed-image-for-desktop-section.jpg',
    badge: 'Culture',
    link: 'https://youtu.be/BYC8jPIHYGg?si=fqlpf39FVBqhETvd'
  },
  {
    type: 'blog',
    title: 'Karate Kata Origins',
    thumbnail: 'https://t3.ftcdn.net/jpg/08/98/16/52/360_F_898165246_7H5EhiaWFHII7Z3h4TInLyL9UUkNbrq3.jpg',
    badge: 'Tradition',
    link: '/blog'
  },
  {
    type: 'video',
    title: 'Jiu-Jitsu for Beginners',
    thumbnail: 'https://cdn.bhdw.net/im/the-struggle-of-two-athletes-in-blue-and-white-outfits-doing-brazilian-95459_w635.webp',
    badge: 'Training',
    link: 'https://youtu.be/BVkGvkFsmjI?si=_HIMUs84a3nYUyzj'
  },
  {
    type: 'blog',
    title: 'Samurai Code in Modern MMA',
    thumbnail: 'https://wallpapers.com/images/hd/dark-samurai-uaf6p658g20zg4al.jpg',
    badge: 'Philosophy',
    link: '/blog'
  }
];

const FeaturedHighlights = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = scrollRef.current;
      const scrollLength = sections.scrollWidth;
      const sectionWrapper = containerRef.current;

      gsap.to(sections, {
        x: () => `-${scrollLength - window.innerWidth}`,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionWrapper,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const bgColor = isDarkMode ? 'bg-black' : 'bg-[#F8F9FA]';
  const cardColor = isDarkMode ? 'bg-[#2C2C2C]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';

  return (
    <section ref={containerRef} className={`relative w-full overflow-hidden ${bgColor}`}>
      <div className="h-screen flex flex-col justify-center px-6 md:px-12">
        <h2 className={`text-3xl md:text-5xl font-extrabold mb-12 text-center ${textColor}`}>Featured Highlights</h2>
        <div
          ref={scrollRef}
          className="flex items-center space-x-6 w-max pr-12"
        >
          {featuredData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${cardColor} ${textColor} rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 w-[360px] h-[360px] flex flex-col justify-between overflow-hidden relative`}
            >
              <img src={item.thumbnail} alt={item.title} className="w-full h-1/2 object-cover" />
              <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3 className="font-bold text-md leading-snug mb-4 text-center">
                  {item.title}
                </h3>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-center text-sm font-semibold bg-red-400  py-1.5 rounded-md hover:bg-yellow-300"
                >
                <span className="text-black">{item.type === 'video' ? 'Watch Now' : 'Read'}</span> 
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHighlights;