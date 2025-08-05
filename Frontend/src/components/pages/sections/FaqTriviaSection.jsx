import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const facts = [
  {
    question: "Which martial art is known as the 'Art of Eight Limbs'?",
    answer:
      'Muay Thai uses fists, elbows, knees, and shins – totaling eight striking points.',
    image: 'https://media.istockphoto.com/id/1150770258/photo/muay-thai-fighter-training-in-the-gym-with-the-punch-bag.jpg?s=612x612&w=0&k=20&c=ajGqzZy5J5ioeuG_WOwvS_2GByuGMaaAxKrAL6z66IY=',
  },
  {
    question: 'Which martial art focuses heavily on ground grappling?',
    answer:
      'Brazilian Jiu-Jitsu emphasizes ground fighting and submission holds.',
    image: 'https://media.istockphoto.com/id/526472313/photo/brazilian-jiu-jitsu-martial-arts.jpg?s=612x612&w=0&k=20&c=u4I6-wToip3AyI9mWtqY3CY4mHpjoyObVGjZDizZPLI=',
  },
  {
    question: 'Where did Taekwondo originate?',
    answer: "South Korea — it's also an Olympic sport.",
    image: 'https://media.istockphoto.com/id/1077629152/photo/man-and-woman-taekwondo-combat.jpg?s=612x612&w=0&k=20&c=QnXLyB57a3iiR31yWF1hP_MXefDenD8te5CoSFsSahI=',
  },
  {
    question: 'What is the primary weapon used in Kendo?',
    answer: 'The shinai — a bamboo sword representing the katana in sparring practice.',
    image: 'https://c4.wallpaperflare.com/wallpaper/708/392/964/the-way-mood-together-sword-wallpaper-preview.jpg',
  },
  {
    question: 'Which martial art is famous for its circular movements and red sashes?',
    answer: 'Capoeira — a Brazilian martial art that combines dance, acrobatics, and music.',
    image: 'https://media.istockphoto.com/id/1331832897/photo/capoeira-fighter-jumping-kicking.jpg?s=612x612&w=0&k=20&c=zGMVsZEwSm8ERVO3pSFf0pVkIWnBP7Nvt5KTUadsrvA=',
  },
  {
    question: 'Which style emphasizes “maximum efficiency with minimum effort”?',
    answer: 'Judo, founded by Jigoro Kano, focuses on using leverage and balance.',
    image: 'https://c4.wallpaperflare.com/wallpaper/246/188/1015/fight-skill-training-technique-wallpaper-preview.jpg',
  },
];

const FaqTriviaSection = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [openIndex, setOpenIndex] = useState(null);

  const bg = isDarkMode ? '#0a0a0a' : '#f9f9f9';
  const text = isDarkMode ? '#f5f5f5' : '#1a1a1a';
  const cardBg = isDarkMode ? '#1f1f1f' : '#ffffff';

  return (
    <div
      className="w-full py-14 px-6 md:px-12"
      style={{ background: bg, color: text }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400 font-serif">
        🤔 Facts & Questions
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {facts.map((item, index) => {
          const isOpen = index === openIndex;

          return (
            <div
              key={index}
              className={`rounded-2xl p-5 border shadow-md transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02] ${
                isOpen ? 'ring-2 ring-red-400' : ''
              }`}
              style={{ background: cardBg, borderColor: isDarkMode ? '#333' : '#ddd' }}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="text-lg font-semibold flex justify-between items-center">
                <span>{item.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-yellow-400' : 'text-gray-400'
                  }`}
                />
              </div>
              {isOpen && (
                <div className="mt-4">
                  <p className="text-sm mb-4 font-sans leading-relaxed">{item.answer}</p>
                  <img
                    src={item.image}
                    alt="answer visual"
                    className="rounded-2xl w-full h-[160px] object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqTriviaSection;