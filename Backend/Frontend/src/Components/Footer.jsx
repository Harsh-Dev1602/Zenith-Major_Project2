import React from 'react';
import Logo from "../../public/Logo.png";
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 px-6 border-t border-zinc-800 font-sans">
      <div className=" container mx-auto">
        <div className="flex flex-col gap-5 sm:flex-row justify-between items-center mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Zenith Logo" className="size-10 rounded-xl object-cover shadow-lg shadow-cyan-500/20" />
              <span className="text-2xl font-black text-white tracking-tighter">
                Zenith<span className="text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe]">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Elevating emotional intelligence through AI-driven insights. Your companion for daily growth and mental clarity.
            </p>
          </div>
  
          <div className="space-y-6">
            <h4 className="text-white font-bold">Contact Us</h4>
            <p className="text-sm">Bypass Road, Square, Manglaya Sadak, Indore, MP 453771</p>
            <a href="mailto:contact@zenith.in" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
              <Mail size={16} /> contact@zenith.in
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© {currentYear} Zenith Wellness Systems. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="text-zinc-500">Verified by Zenith AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;