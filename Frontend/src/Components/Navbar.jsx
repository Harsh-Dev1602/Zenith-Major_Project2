import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Basic icons for mobile toggle
import Logo from '../../public/Logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <img 
            src={Logo} 
            alt="ZENITH Logo" 
            className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-300" 
          />
          <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe]">
             Zenith
          </span>
        </Link>

        

        {/* Desktop Action Buttons */}
        <div className="hidden  md:flex items-center gap-4">
          <Link to="/login" className="px-6 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-all border border-slate-200 rounded-full hover:bg-slate-50">
            Log in
          </Link>
          <Link to="/signup" className="px-6 py-2 text-sm font-semibold text-white bg-linear-to-r from-[#4facfe] to-[#00f2fe] rounded-full shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform active:scale-95">
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <Link to="/login" className="w-full py-3 text-center font-semibold text-slate-700 border border-slate-200 rounded-xl">
              Log in
            </Link>
            <Link to="/signup" className="w-full py-3 text-center font-semibold text-white bg-linear-to-r from-[#4facfe] to-[#00f2fe] rounded-xl shadow-lg">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;