import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../constants/projects';
import Reveal from './Reveal';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const shouldReduce = useReducedMotion();

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">01 // SELECTED WORK</p>
          <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase">Concepts built<br />to prove the point.</h2>
        </Reveal>
        
        <div className="flex flex-wrap gap-2" role="tablist">
          {['all', 'web', 'mobile', 'saas', 'tech'].map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-full border font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
                filter === tab 
                  ? 'border-accent-coral bg-acid text-acid-text' 
                  : 'border-studio-border text-studio-textMuted hover:border-accent-coral hover:text-studio-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cards list with layout transitions */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div 
              layout
              key={p.slug}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="project-card group"
            >
              <div className="relative overflow-hidden border border-studio-border/60 aspect-[4/3] rounded-2xl bg-studio-surfaceAlt">
                <img 
                  className="h-full w-full object-cover grayscale-[35%] brightness-[0.9] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100" 
                  src={p.image} 
                  alt={p.title}
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 font-mono text-[8px] tracking-widest uppercase bg-studio-bg/85 px-3 py-1 rounded border border-studio-border">Concept Project</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display font-semibold text-xl group-hover:text-accent-coral transition-colors">{p.title}</h3>
                <span className="font-mono text-[9px] text-studio-textMuted">{p.category} • {p.year}</span>
              </div>
              <p className="mt-1 text-sm text-studio-textMuted leading-relaxed">{p.summary}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
