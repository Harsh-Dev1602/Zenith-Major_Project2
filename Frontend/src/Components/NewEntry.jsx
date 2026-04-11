import { useState } from "react";
import axios from "axios";
import { 
  Save, 
  Loader2, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  Calendar,
  ChevronDown,
  Type
} from "lucide-react";

/**
 * Componente NewEntry
 * Maneja la creación de nuevas entradas de diario y muestra el análisis de humor de Zenith AI.
 */
function NewEntry({ userId = "USER_ID_AQUI" }) {
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState(null);

  // Función para manejar el envío al backend
  const submit = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;
    
    setIsSaving(true);
    try {
      // Endpoint que conecta con tu controlador createEntry
      const response = await axios.post(`http://localhost:5000/api/journal/${userId}`, { 
        text 
      });

      // Guardamos la respuesta que contiene { mood, moodScore }
      setResult(response.data.entry);
      
    } catch (error) {
      console.error("Error al guardar la entrada:", error);
      alert("Hubo un error al conectar con el servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">

      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={submit}
            disabled={isSaving || !text}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? 'Analizando...' : 'Guardar Entrada'}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Nueva Entrada</h1>
              <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                <Calendar size={16} />
                <span className="uppercase tracking-widest">
                  {new Date().toLocaleDateString({ weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
            </div>

            
          </div>
          <div className="p-10">
            {result && (
              <div className="mb-10 p-5 bg-indigo-50 border border-indigo-100 rounded-4xl flex items-center justify-between animate-in fade-in slide-in-from-top duration-700">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <CheckCircle className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Zenith AI Analysis</p>
                    <p className="text-lg font-bold text-indigo-900">
                      Estado detectado: <span className="capitalize">{result.mood}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-600">{result.moodScore}<span className="text-sm opacity-50">/10</span></p>
                  <p className="text-[10px] font-bold text-indigo-400 uppercase">Bienestar</p>
                </div>
              </div>
            )}

            <input 
              placeholder="¿Qué fluye por tu mente hoy?"
              className="w-full min-h-20 text-2xl text-slate-700 placeholder-slate-200 border-none focus:ring-0 outline-none resize-none leading-relaxed bg-transparent"
              value={text}
              onChange={(e) => setText(e.target.value)} 
              disabled={isSaving}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default NewEntry;