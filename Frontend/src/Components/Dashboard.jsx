import React from 'react';
import { Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {
  Plus, Calendar, TrendingUp, Sun, Moon, Heart, ChevronRight, BookOpen, Clock
} from 'lucide-react';
import { useAuth } from '../Context/AuthProvider';

// Mock data for the Mood Trend Chart
const data = [
  { day: 'Mon', mood: 6 },
  { day: 'Tue', mood: 4 },
  { day: 'Wed', mood: 8 },
  { day: 'Thu', mood: 5 },
  { day: 'Fri', mood: 9 },
  { day: 'Sat', mood: 7 },
  { day: 'Sun', mood: 8 },
];

function Dashboard() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">

      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">


        <nav className="flex flex-col gap-2">
          <NavItem icon={<TrendingUp size={20} />} label="Overview" active />
          <NavItem icon={<BookOpen size={20} />} label="Journal" />
          <NavItem icon={<Calendar size={20} />} label="Analytics" />
          <NavItem icon={<Sun size={20} />} label="Morning Prompts" />
        </nav>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 space-y-8 overflow-y-auto">

        {/* Top Bar / Welcome */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Hello, {authUser?.user?.fullname}.</h1>
            <p className="text-slate-500 font-medium">You've logged 5 days in a row. Keep it up!</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">
            <Plus size={20} /> New Entry
          </button>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 1. Main Mood Chart */}
          <div className="md:col-span-2 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-indigo-500" size={18} /> Mood Trend
              </h3>
              <select className="bg-slate-50 border-none text-sm font-bold text-slate-500 rounded-lg focus:ring-0">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4facfe" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="mood" stroke="#4facfe" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Current Stats */}
          <div className="space-y-6">
            <StatCard label="Sleep Quality" value="7.5h" trend="+12%" color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard label="Anxiety Level" value="Low" trend="-5%" color="text-sky-500" bg="bg-sky-50" />
            <div className="bg-zinc-900 p-6 rounded-[2rem] text-white flex flex-col justify-between aspect-square md:aspect-auto h-48">
              <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Daily Wisdom</p>
              <p className="text-lg font-medium italic">"Small steps everyday lead to giant leaps over time."</p>
              <div className="flex justify-between items-center">
                <span className="text-xs opacity-50">— Zenith Team</span>
                <Heart size={16} className="text-rose-500 fill-rose-500" />
              </div>
            </div>
          </div>

          {/* 3. Recent Entries List */}
          <div className="md:col-span-2 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Recent Entries</h3>
              <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <EntryItem date="Today, 8:40 AM" mood="Radiant" excerpt="Morning meditation felt different today. Deep focus..." />
              <EntryItem date="Yesterday" mood="Calm" excerpt="Wrapped up the project. Feeling a weight off my shoulders." />
              <EntryItem date="Oct 12, 2023" mood="Down" excerpt="Rough night of sleep. Need to limit coffee after 2 PM." />
            </div>
          </div>

          {/* 4. Quick Actions / Recommendations */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6">Recommendations</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex gap-4 cursor-pointer hover:bg-indigo-100 transition-colors">
                <div className="size-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Bedtime Routine</p>
                  <p className="text-xs text-slate-500">10 min reflection needed</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-100 flex gap-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                <div className="size-10 rounded-xl bg-white flex items-center justify-center text-cyan-600 shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Focus Session</p>
                  <p className="text-xs text-slate-500">Based on your energy levels</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Sub-components
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold cursor-pointer transition-all ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function StatCard({ label, value, trend, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold ${bg} ${color}`}>
        {trend}
      </div>
    </div>
  );
}

function EntryItem({ date, mood, excerpt }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="size-2 rounded-full bg-cyan-400 shrink-0" />
        <div className="truncate">
          <p className="text-sm font-bold text-slate-900">{date} • <span className="text-cyan-600">{mood}</span></p>
          <p className="text-xs text-slate-500 truncate">{excerpt}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
    </div>
  );
}

export default Dashboard;