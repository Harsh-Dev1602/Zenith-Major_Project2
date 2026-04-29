import React from 'react';
import { Heart, Shield, Microscope, Users, Sparkles, ArrowRight } from 'lucide-react';
import Banner from '../../public/Banner.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      
      {/* 1. Hero / Mission Statement */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-linear-to-b from-cyan-50/40 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-black border border-zinc-200 uppercase tracking-[0.2em]">
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-950 leading-[1.05]">
            Giving every mind the <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe]">space to breathe.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-medium max-w-3xl mx-auto">
            Zenith was born from a simple observation: we track our steps and calories, but we rarely track the patterns of our own minds. We're here to bridge that gap.
          </p>
        </div>
      </section>

      {/* 2. The Problem & Solution (Split Layout) */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-zinc-950 tracking-tight">Why we built Zenith</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              In an era of constant noise, mental well-being often takes a backseat. Traditional journaling is powerful, but it's hard to see the big picture when you're in the middle of a storm. 
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed">
              We combined <strong>Cognitive Behavioral Therapy (CBT)</strong> principles with modern data science to create a tool that doesn't just record your thoughts, but helps you understand them.
            </p>
          </div>
          
          <div className="flex gap-12 pt-4">
            <div>
              <p className="text-4xl font-black text-zinc-900 tracking-tighter">84%</p>
              <p className="text-[10px] text-cyan-600 font-black uppercase tracking-widest mt-1">Reported Clarity</p>
            </div>
            <div className="w-px h-12 bg-zinc-100" />
            <div>
              <p className="text-4xl font-black text-zinc-900 tracking-tighter">2.4M</p>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">Entries Logged</p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-linear-to-r from-[#4facfe] to-[#00f2fe] rounded-[3.5rem] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-white p-2 rounded-[3rem] border border-zinc-100 shadow-2xl shadow-zinc-200">
            <img src={Banner} alt="Zenith Platform Preview" className="rounded-[2.5rem] w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* 3. Our Core Values (Cards) */}
      <section className="bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto py-24 px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-zinc-950">The values that guide us</h2>
            <p className="text-zinc-500 text-lg font-medium">Built with empathy, transparency, and integrity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield className="text-emerald-500" />} 
              title="Privacy as a Right" 
              desc="Your thoughts are yours alone. We use zero-knowledge encryption so even we can't read your entries."
            />
            <ValueCard 
              icon={<Microscope className="text-cyan-500" />} 
              title="Science-First" 
              desc="We work with clinical professionals to ensure our prompts and analytics are grounded in research."
            />
            <ValueCard 
              icon={<Heart className="text-rose-500" />} 
              title="Radical Empathy" 
              desc="We build for humans, not users. Every feature is designed to reduce stress, not increase screen time."
            />
          </div>
        </div>
      </section>
     
    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="p-10 bg-white border border-zinc-100 rounded-[2.5rem] space-y-6 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group hover:-translate-y-1">
      <div className="size-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div className="space-y-3">
        <h4 className="text-2xl font-black text-zinc-900 tracking-tight">{title}</h4>
        <p className="text-zinc-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

export default About;