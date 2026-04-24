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
      const userId = authUser?.user?.id;
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
    const name = authUser?.user?.fullname || "User";
    const userEmail = authUser?.user?.email || "N/A";
    const date = new Date().toLocaleDateString();

    // RGB for #4facfe (Start) and #00f2fe (End)
    const colorStart = [79, 172, 254];
    const colorEnd = [0, 242, 254];
    const navyColor = [68, 68, 132]; // #444484
    const white = [255, 255, 255];
    const black = [9, 9, 11];

    // Helper: Function to draw page ornaments (Header, Footer, Seal)
    const drawPageDecorations = (pageDoc) => {
      const width = 210;

      // 1. TOP LINEAR GRADIENT BAR (Simulated)
      for (let i = 0; i < width; i++) {
        const r = colorStart[0] + (colorEnd[0] - colorStart[0]) * (i / width);
        const g = colorStart[1] + (colorEnd[1] - colorStart[1]) * (i / width);
        const b = colorStart[2] + (colorEnd[2] - colorStart[2]) * (i / width);
        pageDoc.setFillColor(r, g, b);
        pageDoc.rect(i, 0, 1, 3, 'F');
      }

      // 2. BOTTOM LINEAR GRADIENT BAR (Sile Bottom)
      for (let i = 0; i < width; i++) {
        const r = colorStart[0] + (colorEnd[0] - colorStart[0]) * (i / width);
        const g = colorStart[1] + (colorEnd[1] - colorStart[1]) * (i / width);
        const b = colorStart[2] + (colorEnd[2] - colorStart[2]) * (i / width);
        pageDoc.setFillColor(r, g, b);
        pageDoc.rect(i, 287, 1, 10, 'F');
      }
      pageDoc.setTextColor(...black);
      pageDoc.setFontSize(7);
      pageDoc.text("ZENITH | DIGITAL HEALTH CERTIFICATION", 105, 293.5, { align: "center" });

      // 3. LOGO & TEXT GRADIENT (Simulated for "ZENITH")
      try {
        pageDoc.addImage(logoBase64, 'PNG', 15, 10, 25, 25);
      } catch (e) { }

      // ZENITH Text Color Gradient Simulation
      const textX = 45;
      const chars = "ZENITH";
      pageDoc.setFont("helvetica", "bold");
      pageDoc.setFontSize(22);
      for (let i = 0; i < chars.length; i++) {
        const r = colorStart[0] + (colorEnd[0] - colorStart[0]) * (i / chars.length);
        const g = colorStart[1] + (colorEnd[1] - colorStart[1]) * (i / chars.length);
        const b = colorStart[2] + (colorEnd[2] - colorStart[2]) * (i / chars.length);
        pageDoc.setTextColor(r, g, b);
        pageDoc.text(chars[i], textX + (i * 9), 26);
      }

      // 4. ADDRESS (Top Right)
      pageDoc.setTextColor(...black);
      pageDoc.setFontSize(8);
      pageDoc.text("ZENITH AI SYSTEMS", 195, 15, { align: "right" });
      pageDoc.setFont(undefined, "normal");
      pageDoc.text("Bypass Road, Square, Manglaya Sadak,", 195, 20, { align: "right" });
      pageDoc.text("Indore, Madhya Pradesh 453771", 195, 24, { align: "right" });
      pageDoc.setTextColor(...colorStart);
      pageDoc.text("contact@zenith.in", 195, 28, { align: "right" });

      // Bottom Border of Header
      pageDoc.setDrawColor(228, 228, 231);
      pageDoc.line(0, 45, 210, 45);

      // 5. VERIFIED SEAL (On every page)
      const sealY = 270;
      pageDoc.setDrawColor(...navyColor);
      pageDoc.setLineWidth(0.8);
      pageDoc.circle(30, sealY - 10, 10, 'S');
      pageDoc.setFontSize(7);
      pageDoc.setTextColor(...navyColor);
      pageDoc.setFont(undefined, "bold");
      pageDoc.text("VERIFIED", 30, sealY - 11, { align: "center" });
      pageDoc.setFontSize(6);
      pageDoc.text("ZENITH ADMIN", 30, sealY - 7, { align: "center" });
    };

    // Initialize Page 1
    drawPageDecorations(doc);

    // --- REPORT METADATA ---
    doc.setTextColor(...black);
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("USER REPORT", 20, 60);
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.setTextColor(82, 82, 91);
    doc.text(`Name: ${name}`, 20, 67);
    doc.text(`Email: ${userEmail}`, 20, 72);
    doc.text(`Date: ${date}`, 20, 77);

    // --- DATA TABLE ---
    let y = 100;
    const tableX = 15;
    const tableWidth = 180;

    doc.setFillColor(...colorStart);
    doc.rect(tableX, 90, tableWidth, 10, 'F');
    doc.setTextColor(...white);
    doc.setFont(undefined, "bold");
    doc.text("TIMESTAMP", tableX + 5, 96.5);
    doc.text("MOOD", tableX + 45, 96.5);
    doc.text("SCORE", tableX + 75, 96.5);
    doc.text("REFLECTIONS", tableX + 100, 96.5);

    journalData.slice(-15).reverse().forEach((entry) => {
      const reflectionText = entry.text || "No reflection recorded.";
      const splitText = doc.splitTextToSize(reflectionText, 75);
      const rowHeight = (splitText.length * 5) + 8;

      if (y + rowHeight > 260) {
        doc.addPage();
        drawPageDecorations(doc); // Apply gradient header/footer/seal to new page
        y = 50; // Start below the header
      }

      doc.setTextColor(63, 63, 70);
      doc.setFont(undefined, "normal");
      doc.text(new Date(entry.createdAt).toLocaleDateString(), tableX + 5, y + 5);
      doc.text(entry.mood || "Neutral", tableX + 45, y + 5);
      doc.text(`${entry.moodScore}/10`, tableX + 75, y + 5);
      doc.text(splitText, tableX + 100, y + 5);

      doc.setDrawColor(244, 244, 245);
      doc.line(tableX, y + rowHeight - 2, tableX + tableWidth, y + rowHeight - 2);
      y += rowHeight;
    });

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
      <main className=" container mx-auto p-4 md:p-8 space-y-10">

        {/* DASHBOARD HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-2">
            <h1 className="text-xl md:text-4xl font-black text-zinc-950 tracking-tighter">
              Welcome, <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe]"> {authUser?.user?.fullname}</span>
            </h1>
            <p className="text-zinc-500 font-medium"> Resilience: <span className="text-zinc-900 font-bold">{averageMood}/10</span></p>
          </div>
          <div className="flex flex-col sm:flex-row  gap-4">
            <button onClick={generatePDFReport} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 cursor-pointer text-zinc-700 font-bold rounded-2xl hover:bg-zinc-50 transition-all">
              <FileText size={20} /> Download Report
            </button>
            <Link to="/new-entry" className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-white font-bold rounded-2xl shadow-xl hover:bg-zinc-800 transition-all">
              <Plus size={20} /> New Entry
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
            <div className="h-80 w-full ">
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
          <div className="lg:col-span-12 bg-white rounded-[3rem] border-zinc-200 shadow-sm ">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="font-bold text-transparent bg-clip-text bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-2xl">Reflections Archive</h3>
              <button onClick={() => setViewAll(!viewAll)} className="text-xs font-black text-cyan-600 uppercase tracking-widest bg-cyan-50 px-4 py-2 rounded-full">
                {viewAll ? 'Collapse' : 'View All'}
              </button>
            </div>
            <div className="divide-y overflow-auto Hide divide-zinc-100">
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
    <div className="group flex items-center justify-between px-10 py-5 hover:bg-zinc-50 transition-all">
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
    </div>
  );
}

function RecommendationCard({ icon, title, desc, color }) {
  const themes = {
    cyan: "bg-white border-zinc-200 text-cyan-500",
    dark: "bg-white border-zinc-200 text-zinc-900"
  };
  return (
    <div className={`p-5 rounded-2xl border border-gray-200 flex items-center gap-5 transition-all hover:shadow-lg hover:border-cyan-200 group`}>
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