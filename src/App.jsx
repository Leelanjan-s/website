import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Sun, 
  Moon, 
  ArrowUpRight, 
  Mail, 
  Timer, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

// Form Validation Schema using Zod
const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name (at least 2 characters)").max(80),
  email: z.string().trim().email("Enter a valid email address").max(254),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  segment: z.string().min(1, "Pick the closest segment fit"),
  type: z.string().min(1, "Pick a project type"),
  budget: z.string().min(1, "Pick a budget range"),
  timeline: z.string().min(1, "Pick a timeline"),
  message: z.string().trim().min(15, "Give us at least a couple of sentences (15+ chars)").max(2000),
  website: z.string().max(200).optional().or(z.literal("")), // Honeypot
});

// Staggered scroll reveal wrapper
const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

function Reveal({ children, className = "" }) {
  const shouldReduce = useReducedMotion();
  
  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealVariant}
    >
      {children}
    </motion.div>
  );
}

const PROJECTS = [
  {
    slug: "pulseboard",
    title: "Pulseboard",
    category: "SaaS",
    tags: ["saas", "web"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwwfHx8fDE3ODczMzY4NDR8MA&ixlib=rb-4.1.0&q=85&w=1600&auto=format&fit=crop",
    summary: "Real-time magazine-style operational analytics dashboard concept."
  },
  {
    slug: "mesa",
    title: "Mesa",
    category: "Mobile",
    tags: ["mobile"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBhcHAlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwwfHx8fDE3ODczMzY4NDR8MA&ixlib=rb-4.1.0&q=85&w=1600&auto=format&fit=crop",
    summary: "Fast table-side QR ordering app concept for neighbourhood eateries."
  },
  {
    slug: "kinetic",
    title: "Kinetic",
    category: "Web",
    tags: ["web"],
    year: "2025",
    image: "https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMDNkJTIwbWluaW1hbCUyMHRlY2h8ZW58MHx8fHwxNzg3MzM2ODQ0fDA&ixlib=rb-4.1.0&q=85&w=1600&auto=format&fit=crop",
    summary: "A headless e-commerce storefront concept where scroll carries the story."
  },
  {
    slug: "studyloop",
    title: "StudyLoop",
    category: "EdTech",
    tags: ["web", "tech"],
    year: "2025",
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwbWluaW1hbCUyMHRlY2h8ZW58MHx8fHwxNzg3MzM2ODQ0fDA&ixlib=rb-4.1.0&q=85&w=1600&auto=format&fit=crop",
    summary: "Spaced-repetition learning platform designed for transit mobile rides."
  },
  {
    slug: "devfolio",
    title: "Devfolio OS",
    category: "AI SaaS",
    tags: ["saas", "tech"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxzb2Z0d2FyZSUyMGRldmVsb3BlcnMlMjB3b3JraW5nJTIwdGVhbXxlbnwwfHx8fDE3ODczMzY4NDR8MA&ixlib=rb-4.1.0&q=85&w=1600&auto=format&fit=crop",
    summary: "AI-assisted developer portfolio generator with strict design bounds."
  },
  {
    slug: "teamspace",
    title: "Teamspace",
    category: "SaaS",
    tags: ["saas", "web"],
    year: "2025",
    image: "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&w=1600",
    summary: "Async-first communication suite that replaces chat chaos with decisions."
  }
];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('color-theme') || 'light');
  const [filter, setFilter] = useState('all');
  const [submitState, setSubmitState] = useState({ success: false, loading: false, error: false });
  const shouldReduce = useReducedMotion();

  // Apply Theme Toggle Class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [theme]);

  // Form hooks
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", email: "", company: "", segment: "", type: "", budget: "", timeline: "", message: "", website: ""
    }
  });

  // Pre-fill segment and scroll smoothly
  const handleSegmentClick = (segmentVal) => {
    setValue('segment', segmentVal);
  };

  // Submit Handler
  const onSubmit = async (values) => {
    setSubmitState({ success: false, loading: true, error: false });
    
    // Honeypot spam test
    if (values.website && values.website.trim() !== "") {
      console.warn("Honeypot activated.");
      setTimeout(() => {
        setSubmitState({ success: true, loading: false, error: false });
      }, 500);
      return;
    }

    try {
      // Formspree/Web3Forms mockup post (can be replaced by real post)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitState({ success: true, loading: false, error: false });
    } catch (err) {
      setSubmitState({ success: false, loading: false, error: true });
    }
  };

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-studio-bg text-studio-text relative min-h-screen transition-colors duration-300 noise-overlay">
        
        {/* Animated Background shapes */}
        <div className="absolute top-[8%] right-[-8%] w-[55vw] h-[55vw] rounded-full bg-accent-coral blob pointer-events-none z-0"></div>
        <div className="absolute top-[38%] left-[-18%] w-[45vw] h-[45vw] rounded-full bg-studio-surfaceAlt blob pointer-events-none z-0" style={{ animationDelay: '-6s' }}></div>

        {/* Sticky Header */}
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

        {/* Main Content */}
        <main id="top" className="pt-20 relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Hero Section */}
          <section className="hero py-24 md:py-36">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-6">Product Studio — Design × Engineering</p>
              <h1 className="font-display font-semibold tracking-tighter leading-[0.9] text-5xl sm:text-7xl lg:text-8xl max-w-5xl uppercase">
                Ideas, engineered<br />into products<br /><span className="text-accent-coral">people actually use.</span>
              </h1>
              <p className="mt-8 max-w-md text-studio-textMuted text-base leading-relaxed">
                We design and build bespoke web apps, mobile apps, and custom software for tech founders, businesses replacing spreadsheets, and students defending a capstone.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a className="bg-acid text-acid-text font-mono text-[10px] tracking-wider uppercase px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200" href="#contact-section">
                  Book a call ↗
                </a>
                <a className="border border-studio-border text-studio-text font-mono text-[10px] tracking-wider uppercase px-8 py-4 rounded-full hover:border-accent-coral transition-colors duration-200" href="#work">
                  Explore Projects
                </a>
              </div>
            </Reveal>
          </section>

          {/* Marquee section */}
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

          {/* Work Section */}
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
                {filteredProjects.map((p, i) => (
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

          {/* Services Section */}
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

          {/* Industries Section */}
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
              ].map((ind, i) => (
                <Reveal key={ind.id} className="bg-studio-surface">
                  <a 
                    href="#contact-section" 
                    onClick={() => handleSegmentClick(ind.id)}
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

          {/* Process Section */}
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

          {/* Technology Section */}
          <section id="technology" className="py-24 md:py-32 border-t border-studio-border/60">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">05 // ARCHITECTURE</p>
              <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase mb-16">Boring where it counts.<br />Brave where it shows.</h2>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Reveal className="p-8 border border-studio-border rounded-2xl bg-studio-surface">
                <p className="font-mono text-[9px] tracking-wider uppercase text-accent-coral mb-6">Frontend Stack</p>
                <ul className="space-y-3 font-medium text-sm">
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> React / Next.js</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Tailwind CSS</li>
                  <li className="flex items-center gap-3"><span class="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Framer Motion</li>
                  <li className="flex items-center gap-3"><span class="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> TypeScript</li>
                </ul>
              </Reveal>
              
              <Reveal className="p-8 border border-studio-border rounded-2xl bg-studio-surface">
                <p className="font-mono text-[9px] tracking-wider uppercase text-accent-coral mb-6">Backend & Data</p>
                <ul className="space-y-3 font-medium text-sm">
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> FastAPI / Node.js</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> PostgreSQL</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> MongoDB</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Redis Caching</li>
                </ul>
              </Reveal>

              <Reveal className="p-8 border border-studio-border rounded-2xl bg-studio-surface">
                <p className="font-mono text-[9px] tracking-wider uppercase text-accent-coral mb-6">Ops & Integrations</p>
                <ul className="space-y-3 font-medium text-sm">
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Vercel / AWS</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> GitHub CI Workflows</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> LLM API Integrations</li>
                  <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 bg-accent-coral rounded-full"></span> Stripe Billing engines</li>
                </ul>
              </Reveal>
            </div>
          </section>

          {/* Studio / About Section */}
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

          {/* Students Section */}
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
                  onClick={() => handleSegmentClick('Student project')}
                >
                  Get Student Rates ↗
                </a>
              </div>
            </Reveal>
          </section>

          {/* Contact Form Section */}
          <section className="py-24 md:py-32 border-t border-studio-border/60" id="contact-section">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-3">07 // START A PROJECT</p>
              <h2 className="font-display font-semibold tracking-tighter leading-none text-4xl sm:text-5xl uppercase mb-16">Tell us what<br />you're <span className="text-accent-coral">building.</span></h2>
            </Reveal>
            
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <aside className="lg:col-span-4 space-y-8">
                <Reveal>
                  <a className="email font-mono text-[9px] tracking-widest uppercase text-studio-text hover:text-accent-coral flex items-center gap-2 border border-studio-border px-5 py-4 rounded-xl transition-all duration-200" href="mailto:hello@oblique.studio">
                    hello@oblique.studio
                  </a>
                </Reveal>
                <div className="space-y-6">
                  {[
                    { i: Timer, t: "One business day", c: "A real engineer reviews and answers every message directly." },
                    { i: MessageSquare, t: "A working call", c: "30 minutes to details the project core scope. No sales slides." },
                    { i: ShieldCheck, t: "Fixed, honest quote", c: "A written breakdown of tasks and pricing prior to coding." }
                  ].map((expect, idx) => (
                    <Reveal key={idx} className="flex gap-4">
                      <expect.i className="text-accent-coral h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display font-semibold text-base mb-1">{expect.t}</h3>
                        <p className="text-xs text-studio-textMuted leading-relaxed">{expect.c}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </aside>
              
              <Reveal className="lg:col-span-8 border border-studio-border/60 p-8 md:p-12 bg-studio-surface rounded-3xl relative">
                <p className="font-mono text-[10px] tracking-wider uppercase text-accent-coral mb-8">Project inquiry</p>
                
                {submitState.success ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-accent-teal mb-4 animate-bounce" />
                    <h3 className="font-display font-semibold text-2xl mb-2">Got it. Talk soon.</h3>
                    <p className="text-sm text-studio-textMuted leading-relaxed max-w-md mx-auto">
                      Your inquiry is received. A senior engineer will review it and reply within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        Your name *
                        <input 
                          {...register('name')}
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all"
                          placeholder="Ada Lovelace"
                        />
                        {errors.name && <span className="text-[10px] text-accent-coral mt-1 block">{errors.name.message}</span>}
                      </label>
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        Email *
                        <input 
                          {...register('email')}
                          type="email"
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all"
                          placeholder="ada@company.com"
                        />
                        {errors.email && <span className="text-[10px] text-accent-coral mt-1 block">{errors.email.message}</span>}
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        Company / organisation
                        <input 
                          {...register('company')}
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all"
                          placeholder="Optional"
                        />
                      </label>
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        You are a… *
                        <select 
                          {...register('segment')}
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all appearance-none"
                        >
                          <option value="">Select segment</option>
                          <option value="Local business">Local business</option>
                          <option value="SME">SME</option>
                          <option value="Startup">Startup</option>
                          <option value="Education">Education</option>
                          <option value="Software / technical team">Software / technical team</option>
                          <option value="Student project">Student project</option>
                        </select>
                        {errors.segment && <span className="text-[10px] text-accent-coral mt-1 block">{errors.segment.message}</span>}
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        Project type *
                        <select 
                          {...register('type')}
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all appearance-none"
                        >
                          <option value="">Select type</option>
                          <option value="Web application">Web application</option>
                          <option value="Mobile app">Mobile app</option>
                          <option value="Design / branding">Design / branding</option>
                          <option value="AI integration">AI integration</option>
                          <option value="MVP sprint">MVP sprint</option>
                          <option value="Dedicated product team">Dedicated product team</option>
                        </select>
                        {errors.type && <span className="text-[10px] text-accent-coral mt-1 block">{errors.type.message}</span>}
                      </label>
                      
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        Budget *
                        <select 
                          {...register('budget')}
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all appearance-none"
                        >
                          <option value="">Select range</option>
                          <option value="Under $5k">Under $5k</option>
                          <option value="$5k – $15k">$5k – $15k</option>
                          <option value="$15k – $50k">$15k – $50k</option>
                          <option value="$50k+">$50k+</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                        {errors.budget && <span className="text-[10px] text-accent-coral mt-1 block">{errors.budget.message}</span>}
                      </label>
                      
                      <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                        Timeline *
                        <select 
                          {...register('timeline')}
                          className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all appearance-none"
                        >
                          <option value="">Select timeline</option>
                          <option value="ASAP">ASAP</option>
                          <option value="1 – 3 months">1 – 3 months</option>
                          <option value="3 – 6 months">3 – 6 months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                        {errors.timeline && <span className="text-[10px] text-accent-coral mt-1 block">{errors.timeline.message}</span>}
                      </label>
                    </div>
                    
                    <label className="font-mono text-[8px] tracking-wider uppercase text-studio-textMuted block">
                      Tell us about the project *
                      <textarea 
                        {...register('message')}
                        className="mt-2 w-full border border-studio-border bg-studio-bg text-studio-text text-sm rounded-lg px-4 py-3 focus:border-accent-coral focus:ring-1 focus:ring-accent-coral outline-none transition-all min-h-[120px] resize-y"
                        placeholder="What are you building, who is it for, and what does success look like?"
                      />
                      {errors.message && <span className="text-[10px] text-accent-coral mt-1 block">{errors.message.message}</span>}
                    </label>
                    
                    {/* Honeypot Input */}
                    <div className="hidden" aria-hidden="true">
                      <input {...register('website')} tabIndex={-1} autoComplete="off" />
                    </div>
                    
                    {submitState.error && (
                      <div className="border border-red-500/40 bg-red-500/5 p-4 rounded-xl flex gap-3 text-xs text-studio-text">
                        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <p>Our server couldn't catch that. Please retry, or email directly to hello@oblique.studio.</p>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                      <button 
                        disabled={submitState.loading}
                        className="submit bg-acid hover:bg-acid-hover text-acid-text font-mono text-[10px] tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-200 disabled:opacity-60" 
                        type="submit"
                      >
                        {submitState.loading ? 'Sending...' : 'Send inquiry'} <span className="arrow">↗</span>
                      </button>
                      <p className="fineprint text-[8px] font-mono text-studio-textMuted leading-relaxed max-w-sm">
                        No newsletters, no cold calls, no selling your data. Your message goes straight to the people who would build your project.
                      </p>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>
          </section>

          {/* Footer Next Section */}
          <section className="next border-t border-studio-border/60 py-24 md:py-32 reveal group">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-coral mb-4">Next step</p>
              <h2 className="font-display font-semibold tracking-tighter leading-none text-5xl sm:text-7xl lg:text-9xl uppercase max-w-5xl">
                Let's build<br /><span className="text-outline">something rare</span>
              </h2>
              <a className="next-link font-mono text-[10px] tracking-wider uppercase text-studio-text hover:text-accent-coral mt-8 inline-block" href="#contact-section">
                Start a project ↗
              </a>
            </Reveal>
          </section>
        </main>

        {/* Footer */}
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
      </div>
    </ReactLenis>
  );
}
