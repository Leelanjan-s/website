import React from 'react';
import Reveal from './Reveal';

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-studio-border/60">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">02 // CAPABILITIES</p>
        <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase mb-16">Everything a product needs.<br />Nothing it doesn't.</h2>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { n: "01", t: "Product Strategy", d: "Stakeholder alignment workshops, technical feasibility scopes, and concrete roadmaps designed before building." },
          { n: "02", t: "Web Development", d: "Fast, SEO-optimized, and accessible web experiences built using React, Next.js, or lightweight static stacks." },
          { n: "03", t: "Mobile Applications", d: "High-performance cross-platform apps built using React Native, handling both stores with ease." },
          { n: "04", t: "UI/UX Brand Systems", d: "Interfaces built on robust design systems and motion principles, making your app look highly polished." },
          { n: "05", t: "AI Integration", d: "Adding practical LLM features, workflow automation engines, and cost-controlled data pipelines." },
          { n: "06", t: "MVP Sprints", d: "A focused 4–8 week sprint path engineered to deliver a polished prototype for demo days or early launches." }
        ].map(cap => (
          <Reveal key={cap.n} className="p-8 border border-studio-border rounded-2xl bg-studio-surface hover:border-accent-coral transition-all duration-300">
            <span className="font-display font-bold text-4xl text-studio-textMuted/30">{cap.n}</span>
            <h3 className="font-display font-semibold text-2xl mt-4 mb-3">{cap.t}</h3>
            <p className="text-sm text-studio-textMuted leading-relaxed">{cap.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
