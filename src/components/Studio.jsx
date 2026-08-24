import React from 'react';
import Reveal from './Reveal';

export default function Studio() {
  return (
    <section id="studio" className="py-24 md:py-32 border-t border-studio-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">06 // THE SHOP</p>
            <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase">Small team.<br />Sharp tools.<br />Zero theatre.</h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-studio-text">
              OBLIQUE is a compact product studio comprising designers who understand codebase constraints and developers who care about visual craft. We coordinate directly with founders and teams without account managers acting as middleware.
            </p>
            <p className="text-sm text-studio-textMuted leading-relaxed">
              Our operating philosophy is built on absolute alignment: clean code repositories, shared design tokens, and honest timelines. We choose to work on few concurrent builds to dedicate undivided engineering attention to each product.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 pt-8 border-t border-studio-border/60">
            <Reveal>
              <h4 className="font-display font-semibold text-lg mb-2">Senior only</h4>
              <p className="text-xs text-studio-textMuted leading-relaxed">The engineers on the scoping call are the ones merging commits in your codebase.</p>
            </Reveal>
            <Reveal>
              <h4 className="font-display font-semibold text-lg mb-2">Craft is the moat</h4>
              <p className="text-xs text-studio-textMuted leading-relaxed">Aesthetically distinctive interfaces built on performant, accessible web codebases.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
