import React from 'react';
import Reveal from './Reveal';

export default function Students({ onSegmentSelect }) {
  return (
    <section id="students" className="py-24 md:py-32 border-t border-studio-border/60">
      <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-studio-surface border border-studio-border rounded-3xl p-8 md:p-16">
        <div className="lg:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-4">Dedicated Lane</p>
          <h2 className="font-display font-semibold tracking-tighter leading-[0.95] text-4xl sm:text-5xl uppercase">Your degree<br />deserves a demo<br /><span className="text-accent-coral">that works.</span></h2>
          <p className="mt-6 text-sm text-studio-textMuted leading-relaxed max-w-xl">
            Final-year projects, capstones, and hackathon prototypes built to production standards. We help you construct impressive frontends and explainable architectures, offered at friendly student pricing.
          </p>
        </div>
        <div className="lg:col-span-5 lg:pl-6 space-y-4 font-mono text-[9px] tracking-wider uppercase text-studio-textMuted">
          <div className="flex items-center gap-3 border-b border-studio-border/60 pb-3"><span className="h-2 w-2 bg-accent-coral rounded-full"></span> Semester timeline scoping</div>
          <div className="flex items-center gap-3 border-b border-studio-border/60 pb-3"><span className="h-2 w-2 bg-accent-coral rounded-full"></span> Live URL demo staging</div>
          <div className="flex items-center gap-3 border-b border-studio-border/60 pb-3"><span className="h-2 w-2 bg-accent-coral rounded-full"></span> Explained codebase structures</div>
          <div className="flex items-center gap-3"><span className="h-2 w-2 bg-accent-coral rounded-full"></span> Capstone presentation prep</div>
          
          <a 
            className="mt-8 bg-studio-text text-studio-bg font-mono text-[9px] tracking-wider uppercase px-6 py-3.5 rounded-full inline-block hover:scale-105 active:scale-95 transition-transform duration-200" 
            href="#contact-section" 
            onClick={() => onSegmentSelect('Student project')}
          >
            Get Student Rates ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}
