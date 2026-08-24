import React from 'react';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="hero py-24 md:py-36">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-6">Product Studio — Design × Engineering</p>
        <h1 className="font-display font-semibold tracking-tighter leading-[0.9] text-5xl sm:text-7xl lg:text-8xl max-w-5xl uppercase">
          Ideas, engineered<br />into products<br /><span className="text-accent-coral">people actually use.</span>
        </h1>
        <p className="mt-8 max-w-md text-studio-textMuted text-base leading-relaxed">
          We design and build bespoke web apps, mobile apps, and custom software for tech founders, businesses replacing spreadsheets, and students defending a capstone.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a className="bg-acid text-acid-text font-mono text-[10px] tracking-wider uppercase px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200" href="#contact-section">
            Book a call ↗
          </a>
          <a className="border border-studio-border text-studio-text font-mono text-[10px] tracking-wider uppercase px-8 py-4 rounded-full hover:border-accent-coral transition-colors duration-200" href="#work">
            Explore Projects
          </a>
        </div>
      </Reveal>
    </section>
  );
}
