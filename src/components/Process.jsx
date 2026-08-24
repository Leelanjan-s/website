import React from 'react';
import Reveal from './Reveal';

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 border-t border-studio-border/60">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">04 // METHODOLOGY</p>
        <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase mb-16">No mystery.<br />Just momentum.</h2>
      </Reveal>
      
      <div className="space-y-px bg-studio-border/60 border border-studio-border/60">
        {[
          { n: "01", t: "Discover", w: "Week 1 // Mapping", d: "Understanding the underlying business goal. We define boundaries, set budgets, and deliver a detailed scope of work alongside a fixed quote." },
          { n: "02", t: "Define", w: "Week 1-2 // Scoping", d: "We outline core user pathways and specify target stack technologies. All unnecessary features are parked to assure delivery velocity." },
          { n: "03", t: "Design", w: "Week 2-4 // Visuals", d: "Interactive mockups and custom components constructed across both dark and light variants to guarantee visual fidelity." },
          { n: "04", t: "Build", w: "Week 3-8 // Coding", d: "Writing fully typesafe code with active continuous integration checks. Clients receive a staging url that updates live with weekly demos." },
          { n: "05", t: "Ship", w: "Week 8+ // Launch", d: "Deploying code to client managed accounts and delivering complete codebases alongside clean architectural documentation." }
        ].map(step => (
          <Reveal key={step.n} className="bg-studio-surface">
            <div className="group grid md:grid-cols-12 gap-6 p-8 md:p-12 hover:bg-studio-surfaceAlt transition-colors duration-300">
              <span className="md:col-span-2 font-display font-bold text-5xl md:text-7xl text-outline group-hover:text-accent-coral transition-colors">{step.n}</span>
              <div className="md:col-span-4">
                <h3 className="font-display font-semibold text-2xl mb-2">{step.t}</h3>
                <span className="font-mono text-[9px] text-accent-coral">{step.w}</span>
              </div>
              <p className="md:col-span-6 text-sm text-studio-textMuted leading-relaxed">{step.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
