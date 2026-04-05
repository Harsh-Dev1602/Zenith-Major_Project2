import React from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div style={{height:"calc(100vh - 85px)"}} className=" w-full flex bg-zinc-50/50">

      {/* Right Side: Form (Primary Focus) */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-white shadow-2xl z-10">
        <div className="w-full max-w-lg space-y-8">


          <h1 className="text-4xl font-black leading-normal text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe] tracking-tight">Create your account</h1>


          {/* Signup Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>

            {/* Full Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">Confirm</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <button className="md:col-span-2 w-full py-4 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-white font-bold rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-lg">
              Create Account
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-zinc-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Left Side: Social Proof / Features (Desktop) */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-16 bg-linear-to-b from-zinc-50 to-zinc-100/50 border-r border-zinc-200/50">

        <div className="space-y-10">
          <h3 className="text-3xl font-black text-zinc-900 leading-tight">
            The space you need for a <span className="text-transparent bg-clip-text bg- leading-normal-to-r from-[#4facfe] to-[#00f2fe]">healthier mind.</span>
          </h3>

          <div className="space-y-6">
            <FeatureItem
              title="End-to-End Encrypted"
              desc="Your journal is private. Not even Zenith can read it."
            />
            <FeatureItem
              title="AI Mood Insights"
              desc="Visualize patterns you never knew existed."
            />
            <FeatureItem
              title="Expert-Backed Prompts"
              desc="CBT-based journaling for better results."
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200/50 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900 leading-none">Safe & Secure</p>
            <p className="text-xs text-zinc-500 mt-1">GDPR & HIPAA compliant standards.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function FeatureItem({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <CheckCircle2 className="text-indigo-600" size={24} />
      </div>
      <div>
        <h4 className="font-bold text-zinc-900 text-lg">{title}</h4>
        <p className="text-zinc-600">{desc}</p>
      </div>
    </div>
  );
}

export default Signup;