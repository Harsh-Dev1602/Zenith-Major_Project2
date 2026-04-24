import React from 'react';
import { Heart, Shield, Microscope, Users, Sparkles, ArrowRight } from 'lucide-react';
import Banner from '../../public/Banner.png';

function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      
      {/* 1. Hero / Mission Statement */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-linear-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold border border-indigo-100 uppercase tracking-widest">
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-950 leading-[1.05]">
            Giving every mind the <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe]">space to breathe.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-medium">
            Zenith was born from a simple observation: we track our steps, our calories, and our sleep—but we rarely track the patterns of our own minds. We're here to change that.
          </p>
        </div>
      </section>

      {/* 2. The Problem & Solution (Split Layout) */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-black text-zinc-950">Why we built Zenith</h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            In an era of constant noise, mental well-being often takes a backseat. Traditional journaling is powerful, but it's hard to see the big picture when you're in the middle of a storm. 
          </p>
          <p className="text-lg text-zinc-600 leading-relaxed">
            We combined <strong>Cognitive Behavioral Therapy (CBT)</strong> principles with modern data science to create a tool that doesn't just record your thoughts, but helps you understand them.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-black text-indigo-600">84%</p>
              <p className="text-sm text-zinc-500 font-bold uppercase">Reported Clarity</p>
            </div>
            <div>
              <p className="text-3xl font-black text-cyan-500">2.4M</p>
              <p className="text-sm text-zinc-500 font-bold uppercase">Entries Logged</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-inner">
           <div className="md:col-span-6 bg-white rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100">
            <img src={Banner} alt="Zenith" className="rounded-2xl w-full h-auto" />
          </div>
        </div>
      </section>

      {/* 3. Our Core Values (Cards) */}
      <section className="bg-zinc-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight">The values that guide us</h2>
            <p className="text-zinc-400 text-lg">Built with empathy, transparency, and integrity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield className="text-emerald-400" />} 
              title="Privacy as a Right" 
              desc="Your thoughts are yours alone. We use zero-knowledge encryption so even we can't read your entries."
            />
            <ValueCard 
              icon={<Microscope className="text-cyan-400" />} 
              title="Science-First" 
              desc="We work with mental health professionals to ensure our prompts and analytics are grounded in clinical research."
            />
            <ValueCard 
              icon={<Heart className="text-rose-400" />} 
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
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] space-y-6 hover:border-zinc-700 transition-colors">
      <div className="size-14 rounded-2xl bg-zinc-800 flex items-center justify-center shadow-inner">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h4 className="text-2xl font-bold">{title}</h4>
      <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default About;