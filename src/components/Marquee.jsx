import React from 'react';

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-studio-border/60 py-6 select-none reveal">
      <div className="flex w-max marquee-track font-display text-2xl md:text-3xl font-medium tracking-tight uppercase">
        <div className="flex items-center gap-12 whitespace-nowrap shrink-0">
          <span>Strategy</span> <span className="text-accent-coral">•</span>
          <span className="text-accent-coral">Design •</span>
          <span className="text-accent-coral">Engineering •</span>
          <span className="text-accent-coral">AI Integration •</span>
          <span className="text-accent-coral">Mobile Apps •</span>
          <span className="text-accent-coral">Web Apps •</span>
          <span className="text-accent-coral">MVP Sprints •</span>
          <span className="text-accent-coral">Brand Systems •</span>
        </div>
        <div className="flex items-center gap-12 whitespace-nowrap shrink-0" aria-hidden="true">
          <span>Strategy</span> <span className="text-accent-coral">•</span>
          <span className="text-accent-coral">Design •</span>
          <span className="text-accent-coral">Engineering •</span>
          <span className="text-accent-coral">AI Integration •</span>
          <span className="text-accent-coral">Mobile Apps •</span>
          <span className="text-accent-coral">Web Apps •</span>
          <span className="text-accent-coral">MVP Sprints •</span>
          <span className="text-accent-coral">Brand Systems •</span>
        </div>
      </div>
    </section>
  );
}
