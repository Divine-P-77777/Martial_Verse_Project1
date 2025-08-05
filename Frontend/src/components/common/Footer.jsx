import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaInstagram, FaTwitter,
  FaGlobe, FaFacebook, FaYoutube
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const bg = isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#f5f5f5]';
  const text = isDarkMode ? 'text-white' : 'text-[#1a1a1a]';
  const border = isDarkMode ? 'border-red-500' : 'border-gray-300';
  const mutedText = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <footer className={`${bg} ${text} border-t ${border} font-[Cinzel] pt-10 pb-6 px-6 md:px-20 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <Section title="Martial Arts" items={[
          'Karate', 'Kung Fu', 'Taekwondo', 'Muay Thai', 'Jiu-Jitsu', 'Aikido'
        ]} />

        <Section title="Resources" items={[
          <Link key="blog" to="/blog" className="hover:text-red-400 transition">Read Blog</Link>,
          <Link key="playlists" to="/playlists" className="hover:text-red-400 transition">Watch Playlists</Link>,
          <Link key="contact" to="/contact" className="hover:text-red-400 transition">Contact</Link>,
          <Link key="contribute" to="/accessrequest" className="hover:text-red-400 transition">Contribute</Link>,
          <Link key="termsv" to="/terms" className="hover:text-red-400 transition">Terms & Conditions</Link>,
          <Link key="privacy" to="/privacy" className="hover:text-red-400 transition">Privacy</Link>,
        ]} />

        <Section title="About MartialVerse" items={[
          'Global Martial Culture',
          'Tradition Meets Modernity',
          'Combat Wisdom & Discipline'
        ]} />

        <div>
          <h3 className="text-yellow-400 uppercase font-semibold mb-4 tracking-wide">Connect</h3>
          <ul className={`space-y-2 text-sm ${mutedText}`}>
            <SocialLink Icon={FaGlobe} label="martialverse.world" href="#" />
            <SocialLink Icon={MdEmail} label="support@martialverse.world" />
            <SocialLink Icon={FaLinkedin} label="LinkedIn" href="#" />
            <SocialLink Icon={FaInstagram} label="Instagram" href="#" />
            <SocialLink Icon={FaFacebook} label="Facebook" href="#" />
            <SocialLink Icon={FaTwitter} label="Twitter" href="#" />
            <SocialLink Icon={FaYoutube} label="YouTube" href="#" />
            <SocialLink Icon={FaGithub} label="GitHub" href="#" />
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-xs text-center text-gray-400">
        <p>© 2025 MartialVerse. All rights reserved.</p>
        <p>Crafted with honor & skill — Built using React, Tailwind, and Framer Motion</p>
      </div>
    </footer>
  );
}

function Section({ title, items }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div>
      <h3 className="text-yellow-400 uppercase font-semibold mb-4 tracking-wide">{title}</h3>
      <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function SocialLink({ Icon, label, href }) {
  return (
    <li className="flex items-center gap-2 hover:text-red-400 transition">
      {Icon && <Icon className="text-yellow-400" />}
      {href
        ? <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        : <span>{label}</span>}
    </li>
  );
}
