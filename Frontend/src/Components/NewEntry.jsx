import React, { useState } from "react";
import axios from "axios";
import { Save, Loader2, CheckCircle, ArrowLeft, Calendar, Lightbulb } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SUGGESTIONS = [
  "I feel radiant and great today because...",
  "I feel calm and at peace right now...",
  "Today is okay, I feel quite neutral...",
  "I'm feeling a bit anxious and worried...",
  "I feel sad and a little lonely because...",
  "I'm feeling angry and mad about..."
];

function NewEntry() {
  const [authUser] = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const currentText = watch("text", "");

  const handleSuggestion = (prompt) => {
    const combinedText = currentText ? `${currentText}\n\n${prompt} ` : `${prompt} `;
    setValue("text", combinedText);
    toast.success("Prompt added!", { icon: '💡' });
  };

  const onSubmit = async (data) => {
    setIsAnalyzing(true);
    const userId = authUser?.user?.id;

    try {
      const response = await axios.post(`/api/user/journal/${userId}`, { text: data.text });
      if (response.data) {
        toast.success("Entry saved!");
        setResult(response.data.entry);
        reset();
      }
    } catch (error) {
      toast.error("Failed to save entry");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 80.5px)" }} className=" container mx-auto bg-[#FDFDFD] font-sans text-slate-900 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Navigation Bar */}
        <nav className="container mx-auto px-5 sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
          <div className=" flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className=" hidden md:block">Dashboard</span>
            </Link>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-white font-black rounded-2xl cursor-pointer shadow-xl shadow-indigo-200 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {isAnalyzing ? 'Analyzing...' : 'Save Entry'}
            </button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-10 space-y-5">
          <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 bg-slate-50/30">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">New Entry</h1>
              <div className="flex items-center gap-3 text-slate-400 font-bold text-xs mt-2">
                <Calendar size={14} />
                <span className="uppercase tracking-widest">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="p-5">
              {result && (
                <div className=" p-6 bg-indigo-50 border border-indigo-100 rounded-4xl flex items-center justify-between animate-in fade-in slide-in-from-top duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><CheckCircle className="text-indigo-600" size={24} /></div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Zenith AI Result</p>
                      <p className="text-xl font-bold text-indigo-900 capitalize">{result.mood}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-indigo-600">{result.moodScore}</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase">Wellness Score</p>
                  </div>
                </div>
              )}

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Lightbulb size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Writing Prompts</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 Hide">
                  {SUGGESTIONS.map((sug, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestion(sug)}
                      className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </section>

              <textarea
                placeholder="Start writing your thoughts..."
                className="w-full min-h-20 max-h-20 text-xl text-slate-700 placeholder-slate-200 border-none outline-none focus:ring-0  resize-none leading-relaxed bg-transparent"
                {...register("text", { required: "Please write something to analyze." })}
              />

              {errors.text && (
                <p className="text-red-500 text-xs font-bold mt-2">
                  {errors.text.message}
                </p>
              )}
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}

export default NewEntry;