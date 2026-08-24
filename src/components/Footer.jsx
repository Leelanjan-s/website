import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-studio-border/60 bg-studio-surfaceAlt py-16 px-6 md:px-12 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16">
          <div>
            <p className="font-mono text-[10px] tracking-wider uppercase text-studio-textMuted mb-6">Sitemap</p>
            <ul className="space-y-3 text-sm">
              <li><a className="hover:text-accent-coral transition-colors" href="#top">Home</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#work">Work</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#services">Services</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#industries">Industries</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#process">Process</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#technology">Technology</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#studio">Studio</a></li>
              <li><a className="hover:text-accent-coral transition-colors" href="#students">Students</a></li>
            </ul>
          </div>
          
          <div>
            <p className="font-mono text-[10px] tracking-wider uppercase text-studio-textMuted mb-6">Services</p>
            <ul className="space-y-3 text-sm text-studio-textMuted">
              <li>Product Strategy</li>
              <li>Web App Development</li>
              <li>Mobile App Development</li>
              <li>UI/UX Design Systems</li>
              <li>AI Integration</li>
            </ul>
          </div>
          
          <div>
            <p className="font-mono text-[10px] tracking-wider uppercase text-studio-textMuted mb-6">Contact</p>
            <a className="hover:text-accent-coral transition-colors block text-sm font-semibold mb-2" href="mailto:hello@oblique.studio">hello@oblique.studio</a>
            <p className="text-xs text-studio-textMuted">Replies within one business day.</p>
          </div>
          
          <div>
            <p className="font-mono text-[10px] tracking-wider uppercase text-studio-textMuted mb-6">Studio</p>
            <p className="text-xs text-studio-textMuted leading-relaxed max-w-xs">
              A senior product studio for founders, SMEs, and teams who want software that looks — and ships — like it matters.
            </p>
          </div>
        </div>
        
        <div className="border-t border-studio-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[8px] tracking-widest text-studio-textMuted">© 2026 OBLIQUE STUDIO — ALL RIGHTS RESERVED</p>
          <a className="font-mono text-[9px] tracking-widest uppercase text-studio-textMuted hover:text-accent-coral transition-colors" href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
