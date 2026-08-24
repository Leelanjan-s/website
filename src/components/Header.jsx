import React from 'react';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';

export default function Header({ theme, setTheme }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-studio-border/60 bg-studio-bg/85 backdrop-blur-md transition-colors duration-300">
      <nav className="h-full px-6 md:px-12 flex items-center justify-between max-w-7xl mx-auto" aria-label="Primary navigation">
        <a className="logo font-display font-bold text-xl tracking-tight text-studio-text hover:text-accent-coral transition-colors duration-200" href="#top">
          OBLIQUE<span className="text-accent-coral">®</span>
        </a>
        
        <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] tracking-wider uppercase">
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#work">Work</a>
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#services">Services</a>
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#industries">Industries</a>
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#process">Process</a>
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#technology">Technology</a>
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#studio">Studio</a>
          <a className="text-studio-textMuted hover:text-accent-coral transition-colors duration-200" href="#students">Students</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            aria-label="Toggle visual theme" 
            className="p-2 border border-studio-border rounded-full hover:border-accent-coral transition-colors duration-300 text-studio-text"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <a className="nav-cta bg-acid text-acid-text px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200 font-mono text-[9px] uppercase tracking-wider" href="#contact-section">
            Start a project <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </nav>
    </header>
  );
}
