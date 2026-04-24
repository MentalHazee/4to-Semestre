import { useState } from "react";
import type { Ingrediente, IngredienteCreate } from "../../types/ingrediente.types";
import { Info, ShieldAlert, Check } from "lucide-react";

interface Props {
  initialData?: Ingrediente | null;
  onSubmit: (data: IngredienteCreate) => void;
}

const IngredienteForm = ({ initialData, onSubmit }: Props) => {
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");
  const [esAlergeno, setEsAlergeno] = useState(initialData?.es_alergeno || false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setError("");
    onSubmit({ 
      nombre, 
      descripcion, 
      es_alergeno: esAlergeno 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-zinc-200">
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-400">Nombre del Ingrediente</label>
        <input
          type="text"
          placeholder="Ej: Gluten, Tomate, etc."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
        />
        {error && <p className="text-red-500 text-xs mt-1 font-bold">{error}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-500">Descripción (Opcional)</label>
        <textarea
          placeholder="Detalles sobre el ingrediente..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none h-24 transition-all"
        />
      </div>

      <div 
        onClick={() => setEsAlergeno(!esAlergeno)}
        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
          esAlergeno 
            ? "bg-red-950/20 border-red-500/50 text-red-200 shadow-lg shadow-red-900/20" 
            : "bg-zinc-950 border-zinc-800 text-zinc-500"
        }`}
      >
        <div className="flex items-center gap-3">
          <ShieldAlert className={esAlergeno ? "text-red-500" : "text-zinc-700"} />
          <div>
            <p className="font-black text-sm uppercase tracking-wider">¿Es un alérgeno?</p>
            <p className="text-[10px] opacity-70">Marcar si este ingrediente puede causar alergias.</p>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          esAlergeno ? "bg-red-600 border-red-600" : "border-zinc-800"
        }`}>
          {esAlergeno && <Check size={14} className="text-white font-black" />}
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-red-900/40 active:scale-[0.98] mt-4">
        {initialData ? "ACTUALIZAR" : "CREAR INGREDIENTE"}
      </button>
    </form>
  );
};

export default IngredienteForm;