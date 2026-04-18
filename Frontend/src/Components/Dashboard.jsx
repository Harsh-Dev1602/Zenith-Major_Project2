import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip, ResponsiveContainer, AreaChart, Area, XAxis } from 'recharts';
import {
  Plus, TrendingUp, Moon, ChevronRight, Clock, Loader2, ArrowUpDown, FileText, Zap, BrainCircuit
} from 'lucide-react';
import logoBase64 from "../../public/Logo.png";
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

function Dashboard() {
  const [authUser] = useAuth();
  const [journalData, setJournalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const fetchJournal = async () => {
      const userId = authUser?.user?._id || authUser?.user?.id;
      if (!userId) { setLoading(false); return; }
      try {
        const response = await axios.get(`/api/user/all-journal/${userId}`);
        const data = response.data.journal || response.data;
        setJournalData(Array.isArray(data) ? data : []);
      } catch (error) { console.error("Fetch error:", error); }
      finally { setLoading(false); }
    };
    if (authUser) fetchJournal();
  }, [authUser]);

  const averageMood = journalData.length > 0
    ? (journalData.reduce((acc, curr) => acc + (curr.moodScore || 0), 0) / journalData.length).toFixed(1)
    : "0.0";

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const name = authUser?.user?.fullname;
    const userEmail = authUser?.user?.email;
    const date = new Date().toLocaleDateString();

    // --- BRAND COLORS ---
    const gradStart = [72, 198, 239];  // #48c6ef
    const gradEnd = [111, 134, 214];    // #6f86d6
    const black = [9, 9, 11];
    const white = [255, 255, 255];
    const zinc400 = [161, 161, 170];

    // --- 1. CLEAN WHITE HEADER ---
    doc.setFillColor(...white);
    doc.rect(0, 0, 210, 45, 'F');

    // Bottom Border of Header
    doc.setDrawColor(228, 228, 231);
    doc.line(0, 45, 210, 45);

    try {
      doc.addImage(logoBase64, 'PNG', 15, 10, 25, 25);
    } catch (e) {
      doc.setTextColor(...black);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("ZENITH AI", 45, 26);
    }


    doc.setTextColor(...black);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("ZENITH ", 195, 15, { align: "right" });
    doc.setFont(undefined, "normal");
    doc.setTextColor(...zinc400);
    doc.text("Bypass Road, Square, Manglaya Sadak,", 195, 20, { align: "right" });
    doc.text("Indore, Madhya Pradesh 453771", 195, 24, { align: "right" });
    doc.setTextColor(...gradEnd);
    doc.text("contact@zenith.in", 195, 28, { align: "right" });

    // --- 2. REPORT METADATA ---
    doc.setTextColor(...black);
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("USER", 20, 60);

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.setTextColor(82, 82, 91);
    doc.text(`Name: ${name}`, 20, 67);
    doc.text(`Email: ${userEmail}`, 20, 72);
    doc.text(`Report Date: ${date}`, 20, 77);

    // --- 3. DATA TABLE (With Padding & Proper Formatting) ---
    let y = 100;
    const tableX = 15;
    const tableWidth = 180;

    // Table Header Background
    doc.setFillColor(...gradStart);
    doc.rect(tableX, 90, tableWidth, 10, 'F');

    doc.setTextColor(...white);
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    // Padding-aware column placement
    doc.text("TIMESTAMP", tableX + 5, 96.5);
    doc.text("MOOD", tableX + 45, 96.5);
    doc.text("SCORE", tableX + 75, 96.5);
    doc.text("REFLECTIONS & INSIGHTS", tableX + 100, 96.5);

    // Table Content
    journalData.slice(-15).reverse().forEach((entry) => {
      // Dynamic Height Calculation for Padding
      const reflectionText = entry.text || "No reflection recorded.";
      const splitText = doc.splitTextToSize(reflectionText, 75);
      const rowPadding = 8;
      const rowHeight = (splitText.length * 5) + rowPadding;

      // Page Break Logic
      if (y + rowHeight > 260) {
        doc.addPage();
        y = 30;
      }

      doc.setTextColor(63, 63, 70);
      doc.setFont(undefined, "normal");

      // Render Row Data with Vertical Centering logic
      doc.text(new Date(entry.createdAt).toLocaleDateString(), tableX + 5, y + 5);
      doc.text(entry.mood || "Neutral", tableX + 45, y + 5);
      doc.text(`${entry.moodScore}/10`, tableX + 75, y + 5);
      doc.text(splitText, tableX + 100, y + 5);

      // Row Separator
      doc.setDrawColor(244, 244, 245);
      doc.line(tableX, y + rowHeight - 2, tableX + tableWidth, y + rowHeight - 2);

      y += rowHeight;
    });

    // --- 4. SIGNATURE & VERIFICATION AREA ---
    const signY = 270;

    // --- UPDATED VERIFICATION SEAL (Color: #444484) ---
    const navyColor = [68, 68, 132]; // RGB for #444484

    doc.setDrawColor(...navyColor);
    doc.setLineWidth(0.8); // Slightly thicker for a premium feel
    doc.circle(30, signY - 10, 10, 'S'); // Increased radius to 10 for better text fit

    doc.setFontSize(7); // Adjusted for better fit
    doc.setTextColor(...navyColor);
    doc.setFont(undefined, "bold");

    // Positioned to look like a official rubber stamp
    doc.text("VERIFIED", 30, signY - 11, { align: "center" });
    doc.setFontSize(6);
    doc.text("ZENITH ADMIN", 30, signY - 7, { align: "center" });

    // Reset Font for the rest of the document
    doc.setFont(undefined, "normal");

    // --- 5. GRADIENT FOOTER (SILE BOTTOM) ---
    doc.setFillColor(...gradStart);
    doc.rect(0, 287, 105, 10, 'F');
    doc.setFillColor(...gradEnd);
    doc.rect(105, 287, 105, 10, 'F');

    doc.setTextColor(...black);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("ZENITH  | DIGITAL HEALTH CERTIFICATION  ", 105, 293.5, { align: "center" });

    doc.save(`Zenith_Report_${name}.pdf`);
  };

  const chartData = journalData.slice(-7).map(entry => ({
    day: new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
    mood: entry.moodScore || 0,
    label: entry.mood
  }));

  const displayEntries = viewAll
    ? [...journalData].reverse()
    : [...journalData].slice(-5).reverse();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-cyan-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20 font-sans">
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">

        {/* DASHBOARD HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-zinc-950 tracking-tighter">
              Mindset <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">Zenith.</span>
            </h1>
            <p className="text-zinc-500 font-medium">Welcome, {authUser?.user?.fullname}. Resilience: <span className="text-zinc-900 font-bold">{averageMood}/10</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={generatePDFReport} className="flex items-center gap-2 px-6 py-4 bg-white border border-zinc-200 text-zinc-700 font-bold rounded-2xl hover:bg-zinc-50 transition-all">
              <FileText size={18} /> Download Report
            </button>
            <Link to="/new-entry" className="flex items-center gap-2 px-8 py-4 bg-zinc-950 text-white font-bold rounded-2xl shadow-xl hover:bg-zinc-800 transition-all">
              <Plus size={20} className="text-cyan-400" /> New Entry
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CHART */}
          <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
            <h3 className="font-black text-zinc-900 text-xl flex items-center gap-3 mb-10">
              <div className="p-2 bg-zinc-950 rounded-lg text-cyan-400"><TrendingUp size={18} /></div>
              Weekly Flow
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4facfe" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 800 }} dy={10} />
                  <Area type="monotone" dataKey="mood" stroke="#4facfe" strokeWidth={6} fill="url(#colorMood)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* STATS */}
          <div className="lg:col-span-4 space-y-4">
            <RecommendationCard icon={<BrainCircuit size={24} />} title="Average Score" desc={`${averageMood}/10`} color="cyan" />
            <RecommendationCard icon={<Clock size={24} />} title="Journal Logs" desc={`${journalData.length} entries`} color="dark" />

          </div>

          {/* LIST */}
          <div className="lg:col-span-12 bg-white rounded-[3rem] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="font-black text-zinc-950 text-2xl">Reflections Archive</h3>
              <button onClick={() => setViewAll(!viewAll)} className="text-xs font-black text-cyan-600 uppercase tracking-widest bg-cyan-50 px-4 py-2 rounded-full">
                {viewAll ? 'Collapse' : 'View All'}
              </button>
            </div>
            <div className="divide-y divide-zinc-100">
              {displayEntries.map((entry) => (
                <EntryItem
                  key={entry._id}
                  date={new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  time={new Date(entry.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  mood={entry.mood}
                  score={entry.moodScore}
                  excerpt={entry.text}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 p-4 rounded-2xl shadow-2xl text-white border border-zinc-800">
        <p className="text-xl font-black text-cyan-400">{payload[0].value}/10</p>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{payload[0].payload.label}</p>
      </div>
    );
  }
  return null;
};

function EntryItem({ date, time, mood, score, excerpt }) {
  return (
    <div className="group flex items-center justify-between p-8 hover:bg-zinc-50 transition-all">
      <div className="flex items-center gap-10">
        <div className="w-24 shrink-0 text-left">
          <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">{date}</p>
          <p className="text-lg font-black text-zinc-900">{time}</p>
        </div>
        <div className="truncate max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase border border-cyan-100">{mood}</span>
            <span className="text-[11px] font-bold text-zinc-400">Score: {score}/10</span>
          </div>
          <p className="text-zinc-500 text-sm truncate font-medium italic group-hover:text-zinc-800 transition-colors">"{excerpt}"</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-zinc-300 group-hover:text-zinc-950 transition-colors" />
    </div>
  );
}

function RecommendationCard({ icon, title, desc, color }) {
  const themes = {
    cyan: "bg-white border-zinc-200 text-cyan-500",
    dark: "bg-white border-zinc-200 text-zinc-900"
  };
  return (
    <div className={`p-6 rounded-[2rem] border flex items-center gap-5 transition-all hover:shadow-lg hover:border-cyan-200 group`}>
      <div className={`size-14 rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${themes[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-zinc-400 uppercase mb-0.5">{title}</p>
        <p className="text-xl font-black text-zinc-950">{desc}</p>
      </div>
    </div>
  );
}

export default Dashboard;