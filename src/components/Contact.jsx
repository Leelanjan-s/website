import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Timer, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import Reveal from './Reveal';

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

export default function Contact({ selectedSegment }) {
  const [submitState, setSubmitState] = useState({ success: false, loading: false, error: false });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", email: "", company: "", segment: "", type: "", budget: "", timeline: "", message: "", website: ""
    }
  });

  // Pre-fill segment when changed externally
  useEffect(() => {
    if (selectedSegment) {
      setValue('segment', selectedSegment);
    }
  }, [selectedSegment, setValue]);

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
      // Mock API call (simulate Formspree/Web3Forms)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitState({ success: true, loading: false, error: false });
    } catch (err) {
      setSubmitState({ success: false, loading: false, error: true });
    }
  };

  return (
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
  );
}
