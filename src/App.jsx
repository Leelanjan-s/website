import React, { useEffect, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Services from './components/Services';
import Industries from './components/Industries';
import Process from './components/Process';
import Technology from './components/Technology';
import Studio from './components/Studio';
import Students from './components/Students';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reveal from './components/Reveal';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('color-theme') || 'light');
  const [selectedSegment, setSelectedSegment] = useState('');

  // Apply Theme Toggle Class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [theme]);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-studio-bg text-studio-text relative min-h-screen transition-colors duration-300 noise-overlay">
        
        {/* Animated Background shapes */}
        <div className="absolute top-[8%] right-[-8%] w-[55vw] h-[55vw] rounded-full bg-accent-coral blob pointer-events-none z-0"></div>
        <div className="absolute top-[38%] left-[-18%] w-[45vw] h-[45vw] rounded-full bg-studio-surfaceAlt blob pointer-events-none z-0" style={{ animationDelay: '-6s' }}></div>

        {/* Sticky Header */}
        <Header theme={theme} setTheme={setTheme} />

        {/* Main Content */}
        <main id="top" className="pt-20 relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Hero />
          
          <Marquee />
          
          <Work />
          
          <Services />
          
          <Industries onSegmentSelect={setSelectedSegment} />
          
          <Process />
          
          <Technology />
          
          <Studio />
          
          <Students onSegmentSelect={setSelectedSegment} />
          
          <Contact selectedSegment={selectedSegment} />

          {/* Call-to-action Footer Section */}
          <section className="next border-t border-studio-border/60 py-24 md:py-32 reveal group">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-4">Next step</p>
              <h2 className="font-display font-semibold tracking-tighter leading-none text-5xl sm:text-7xl lg:text-9xl uppercase max-w-5xl">
                Let's build<br /><span className="text-outline">something rare</span>
              </h2>
              <a className="next-link font-mono text-[10px] tracking-wider uppercase text-studio-text hover:text-accent-coral mt-8 inline-block" href="#contact-section">
                Start a project ↗
              </a>
            </Reveal>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}
