import React from 'react';
import Reveal from './Reveal';

export default function Industries({ onSegmentSelect }) {
  return (
    <section id="industries" className="py-24 md:py-32 border-t border-studio-border/60">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">03 // SECTOR ALIGNMENT</p>
        <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase mb-16">Same craft.<br />Your context.</h2>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-studio-border/50 border border-studio-border/60">
        {[
          { id: "Local business", n: "Local Business", d: "Booking portals, local SEO landing assets, and ordering layouts that convert traffic." },
          { id: "SME", n: "SMEs", d: "Custom client portal engines and dashboard tools designed to replace complex sheets." },
          { id: "Startup", n: "Startups", d: "Speedy MVP builds and pitch-ready assets constructed with high scaling foundations." },
          { id: "Education", n: "Education", d: "Vibrant educational products and dashboard layouts built for student engagement." },
          { id: "Software / technical team", n: "Technical Teams", d: "Senior development overflow capability and polished layout design engineering." },
          { id: "Student project", n: "Student Projects", d: "Mentorship and codebase builds tailored for semester final projects at helpful pricing." }
        ].map((ind) => (
          <Reveal key={ind.id} className="bg-studio-surface">
            <a 
              href="#contact-section" 
              onClick={() => onSegmentSelect(ind.id)}
              className="group p-8 md:p-10 hover:bg-studio-surfaceAlt transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <h3 className="font-display font-semibold text-2xl group-hover:text-accent-coral transition-colors duration-200">{ind.n}</h3>
                <p className="mt-4 text-sm text-studio-textMuted leading-relaxed">{ind.d}</p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-studio-textMuted group-hover:text-accent-coral flex items-center gap-2 mt-6">
                Start here ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
