
import { Element } from 'react-scroll';
import Hero from './sections/Hero';

import Contact from './sections/Contact';
import MartialCulture from './sections/MartialCulture';
import FeaturedHighlights from './sections/FeaturedHighlights';
import FaqTriviaSection from './sections/FaqTriviaSection';
import QuoteSection from './sections/QuoteSection';
import CinematicCTA from './sections/CinematicCTA';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Element name="hero">
        <Hero />
      </Element>
      <Element name="culture">
        <MartialCulture />
      </Element>
      <Element name="highlights">
        <FeaturedHighlights />
      </Element>
      <Element name="quotes">
        <QuoteSection />
      </Element>
      <Element name="cta">
        <CinematicCTA />
      </Element>
      <Element name="faq">
        <FaqTriviaSection />
      </Element>


      {/* Contact Section */}
      <Element name="contact">
        <Contact />
      </Element>
    </div>
  );
};

export default Home;
