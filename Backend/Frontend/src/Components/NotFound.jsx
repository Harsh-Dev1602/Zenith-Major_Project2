import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronLeft, ShieldAlert, Cpu } from 'lucide-react';

function NotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 81px)" }} className=" container flex flex-col items-center justify-center p-6 overflow-hidden relative bg-white">
      
      {/* Background Decorative Elements - Subtle gradients for depth */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center space-y-8 relative z-10">
        
        {/* Animated Icon Section */}
        <div className="relative inline-block group">
          <div className="size-24 rounded-4xl border border-zinc-200 bg-zinc-50 flex items-center justify-center mx-auto mb-4 group-hover:border-[#4facfe]/50 transition-all duration-500 shadow-sm">
            <Cpu className="text-zinc-400 group-hover:text-[#4facfe] transition-colors" size={40} />
          </div>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-xl animate-bounce shadow-lg shadow-red-200">
            <ShieldAlert size={16} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-[12rem] font-black text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe] tracking-tighter leading-none select-none">
            404
          </h1>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight italic">
            Data Node <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe] not-italic">Missing.</span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto font-medium leading-relaxed">
            The encrypted path you are looking for has been moved, archived, or deleted from the <span className="text-zinc-900 font-bold">Zenith</span> neural network.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-10 py-4 bg-zinc-950 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-200 w-full sm:w-auto"
          >
            <Home size={18} />
            Back to Base
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-linear-to-r from-[#4facfe] to-[#00f2fe] font-black rounded-2xl text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl shadow-cyan-100 w-full sm:w-auto"
          >
            <ChevronLeft size={18} />
            Previous Node
          </button>
        </div>

      </div>
    </div>
  );
}

export default NotFound;