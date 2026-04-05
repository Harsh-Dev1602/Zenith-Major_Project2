import React from 'react';
import { 
   Smile, Frown, PlusCircle, PenTool, BrainCircuit, ChevronRight, Check, 
  ShieldCheck, Zap, 
} from 'lucide-react';
import Banner from '../../public/Banner.png'; 
import Logo from '../../public/Logo.png'

const moods = [
  { name: 'Radiant', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { name: 'Calm', icon: Smile, color: 'text-sky-500', bg: 'bg-sky-50' },
  { name: 'Anxious', icon: BrainCircuit, color: 'text-amber-500', bg: 'bg-amber-50' },
  { name: 'Down', icon: Frown, color: 'text-rose-500', bg: 'bg-rose-50' },
];

const pricingPlans = [
  {
    name: "Lite",
    price: "0",
    description: "Perfect for starting your mindfulness journey.",
    features: ["Daily Mood Tracking", "Basic Journaling", "7-day History", "Mobile App Access"],
    buttonText: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    price: "12",
    description: "Deep insights for those serious about growth.",
    features: ["Unlimited Journaling", "Advanced AI Analytics", "Trigger Identification", "Data Export (PDF/CSV)", "Priority Support"],
    buttonText: "Start Free Trial",
    highlight: true
  },
  {
    name: "Team",
    price: "49",
    description: "Wellness tools for small teams and families.",
    features: ["Up to 5 Users", "Shared Wellness Challenges", "Anonymous Insights", "Dedicated Account Manager"],
    buttonText: "Contact Sales",
    highlight: false
  }
];

function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <main className=" container mx-auto px-6 py-12 md:py-20 space-y-32">
        
        {/* HERO SECTION */}
        <section className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700 border border-indigo-100">
              <Sparkles size={16} /> Track. Understand. Grow.
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1]">
              Clarity for your mind, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">step by step.</span>
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-xl">
              Zenith combines intuitive journaling with powerful mood analytics to help you uncover patterns and build resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-105 transition-transform">
                <PlusCircle size={22} /> Start Journaling
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-zinc-800 bg-white rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:col-span-6 bg-white p-4 md:p-2 rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100">
            <img src={Banner} alt="Zenith" className="rounded-2xl w-full h-auto" />
          </div>
        </section>

        {/* QUICK CHECK-IN SECTION */}
        <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-zinc-200/40 border border-zinc-100">
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-zinc-950 leading-tight">How are you feeling, Alex?</h3>
              <p className="text-zinc-500 mt-2">Log your mood in one tap.</p>
            </div>
            <div className="md:col-span-3 flex flex-wrap gap-4">
              {moods.map(mood => (
                <button key={mood.name} className={`flex items-center gap-3 px-8 py-4 rounded-2xl ${mood.bg} ${mood.color} hover:scale-105 transition-transform border border-transparent hover:border-current/20`}>
                  <mood.icon size={24} strokeWidth={2.5} />
                  <span className="text-lg font-bold">{mood.name}</span>
                </button>
              ))}
              <button className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 ml-auto shadow-lg shadow-zinc-900/20">
                <PenTool size={20} />
                <span className="text-lg font-bold">New Entry</span>
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-zinc-950">Mental health, backed by data.</h2>
            <p className="text-lg text-zinc-600">We use Cognitive Behavioral Therapy (CBT) principles to guide your reflection.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BrainCircuit size={32} />} 
              title="Pattern Detection"
              desc="Our AI identifies what time of day or which activities trigger your anxiety or joy."
              color="sky"
            />
            <FeatureCard 
              icon={<ShieldCheck size={32} />} 
              title="Privacy First"
              desc="Your data is end-to-end encrypted. We believe your thoughts should stay yours."
              color="emerald"
            />
            <FeatureCard 
              icon={<Zap size={32} />} 
              title="Instant Insights"
              desc="Get weekly reports that visualize your emotional journey and habit consistency."
              color="amber"
            />
          </div>
        </section>

        {/* PRICING SECTION (Paidin Inspired) */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-zinc-950">Simple, Transparent Pricing</h2>
            <p className="text-zinc-600">Invest in your mind today.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-[2.5rem] border ${plan.highlight ? 'border-indigo-500 bg-white shadow-2xl scale-105 z-10' : 'border-zinc-200 bg-zinc-50/50'}`}>
                {plan.highlight && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</span>}
                <h4 className="text-xl font-bold text-zinc-900">{plan.name}</h4>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black">${plan.price}</span>
                  <span className="text-zinc-500">/mo</span>
                </div>
                <p className="mt-4 text-sm text-zinc-600">{plan.description}</p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                      <Check size={18} className="text-indigo-500" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-10 py-4 rounded-2xl font-bold transition-all ${plan.highlight ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white shadow-lg' : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-100'}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem question="Is my journaling data secure?" answer="Yes. We use AES-256 encryption. Even our developers cannot read your private entries." />
            <FAQItem question="Can I use Zenith for free?" answer="Absolutely. Our Lite plan is free forever and includes all basic mood tracking features." />
            <FAQItem question="Can I export my data for my therapist?" answer="Yes, Pro users can export their mood analytics and journal entries as a professional PDF report." />
          </div>
        </section>
      </main>

    </div>
  );
}

// Sub-components for cleaner code
function FeatureCard({ icon, title, desc, color }) {
  const colors = {
    sky: 'bg-sky-50 text-sky-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600'
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-zinc-100 space-y-6">
      <div className={`size-16 rounded-2xl flex items-center justify-center border-4 border-white shadow-inner ${colors[color]}`}>
        {icon}
      </div>
      <h4 className="text-2xl font-bold text-zinc-950">{title}</h4>
      <p className="text-zinc-600">{desc}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-zinc-100">
      <h5 className="font-bold text-zinc-900 text-lg flex items-center justify-between cursor-pointer">
        {question} <ChevronRight size={20} className="text-zinc-400" />
      </h5>
      <p className="mt-3 text-zinc-600">{answer}</p>
    </div>
  );
}



const Sparkles = ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;

export default Home;