import React from 'react';
import Reveal from './Reveal';

export default function Technology() {
  return (
    <section id="technology" className="py-24 md:py-32 border-t border-studio-border/60">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">05 // ARCHITECTURE</p>
        <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase mb-16">Boring where it counts.<br />Brave where it shows.</h2>
      </Reveal>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Reveal className="p-8 border border-studio-border rounded-2xl bg-studio-surface">
          <p className="font-mono text-[9px] tracking-wider uppercase text-accent-coral mb-6">Frontend Stack</p>
          <ul className="space-y-3 font-medium text-sm">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> React / Next.js
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Tailwind CSS
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Framer Motion
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> TypeScript
            </li>
          </ul>
        </Reveal>
        
        <Reveal className="p-8 border border-studio-border rounded-2xl bg-studio-surface">
          <p className="font-mono text-[9px] tracking-wider uppercase text-accent-coral mb-6">Backend & Data</p>
          <ul className="space-y-3 font-medium text-sm">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> FastAPI / Node.js
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> PostgreSQL
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> MongoDB
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Redis Caching
            </li>
          </ul>
        </Reveal>

        <Reveal className="p-8 border border-studio-border rounded-2xl bg-studio-surface">
          <p className="font-mono text-[9px] tracking-wider uppercase text-accent-coral mb-6">Ops & Integrations</p>
          <ul className="space-y-3 font-medium text-sm">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Vercel / AWS
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> GitHub CI Workflows
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> LLM API Integrations
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Stripe Billing engines
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
