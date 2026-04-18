import Logo from '../../public/Logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider"
import { User, LogOut } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await axios.post("/api/user/logout");
      sessionStorage.removeItem("Zenith_User");
      toast.success("Log out successfully..");
      window.location.reload();
    }
    catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
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

        {/* Profile Dropdown Section */}
        <div className={`${!authUser ? "hidden" : "flex"} items-center gap-3 pl-2 relative`}>

          {/* Avatar / Botón de activación */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center border-2 border-white shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
            <User size={20} className="text-slate-600" />
          </div>

          {/* Overlay transparente para cerrar al hacer clic fuera */}
          {isOpen && (
            <span
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 w-full h-screen z-40 cursor-default bg-black/5 backdrop-blur-[1px]"
            ></span>
          )}

          {/* Dropdown Card */}
          {isOpen && (
            <div className="absolute top-14 right-0 z-50 w-56 animate-in fade-in zoom-in duration-200 origin-top-right">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">

                {/* User Info Header */}
                <div className="p-4 bg-slate-50/50 border-b border-slate-50">
                  <h3 className="font-black text-slate-900 text-sm truncate">
                    {authUser?.user?.fullname}
                  </h3>
                  <h3 className=" text-slate-400 text-sm">
                    {authUser?.user?.email}
                  </h3>
                  <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mt-1">
                    {authUser?.user?.role == "@dmin"? "Admin" : " "}
                  </p>
                </div>

                {/* Action List */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-600 hover:text-white cursor-pointer transition-all duration-300 group"
                  >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                     Log out
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>


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