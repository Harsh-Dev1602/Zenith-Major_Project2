import Logo from '../../public/Logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider"
import { User } from 'lucide-react';

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
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
          <span className=" hidden sm:block text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe]">
            Zenith
          </span>
        </Link>

        <div className={`${!authUser ? " hidden" : " "} flex items-center gap-3 pl-2`}>
          <div className=" flex-col items-end hidden md:flex">
            <span className="text-xs font-black text-slate-900 leading-none">
              {authUser?.user?.fullname}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center border-2 border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <User size={20} className="text-slate-600" />
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className={`${authUser ? "hidden " : " "} flex items-center gap-4`}>
          <Link to="/login" className="px-6 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-all border border-slate-200 rounded-full hover:bg-slate-50">
            Log in
          </Link>
          <Link to="/signup" className="px-6 py-2 text-sm font-semibold text-white bg-linear-to-r from-[#4facfe] to-[#00f2fe] rounded-full shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform active:scale-95">
            Sign up
          </Link>
        </div>


      </div>
    </nav>
  );
}

export default Navbar;