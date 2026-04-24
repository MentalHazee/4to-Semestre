import type { Ingrediente } from "../../types/ingrediente.types";
import { Edit2, Trash2, ShieldAlert, Info } from "lucide-react";

interface Props {
  data: Ingrediente[];
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: number) => void;
}

const IngredienteTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-red/20 bg-zinc-950/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-brand-red/10 border-b border-brand-red/20">
          <tr>
            <th className="p-4 text-xs font-black text-brand-red uppercase tracking-widest">Ingrediente</th>
            <th className="p-4 text-xs font-black text-brand-red uppercase tracking-widest text-center">Alérgeno</th>
            <th className="p-4 text-xs font-black text-brand-red uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-red/10">
          {data.map((ingrediente) => (
            <tr key={ingrediente.id} className="group hover:bg-brand-red/5 transition-colors">
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-black text-white text-lg uppercase tracking-tight leading-none mb-1">{ingrediente.nombre}</span>
                  {ingrediente.descripcion && (
                    <span className="text-xs text-zinc-400 line-clamp-1">{ingrediente.descripcion}</span>
                  )}
                </div>
              </td>
              <td className="p-4 text-center">
                {ingrediente.es_alergeno ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-brand-red/20 text-brand-red border border-brand-red/20 uppercase">
                    <ShieldAlert size={12} /> ALÉRGENO
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-zinc-900 text-zinc-600 border border-zinc-800 uppercase">
                    No
                  </span>
                )}
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(ingrediente)}
                    className="p-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 hover:bg-brand-red hover:border-brand-red transition-all shadow-lg"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(ingrediente.id)}
                    className="p-2 rounded-lg bg-brand-red/20 text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white transition-all shadow-lg"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="p-8 text-center text-zinc-500 italic font-medium">
                No hay ingredientes cargados todavía. Metéle onda y cargá algo.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IngredienteTable;