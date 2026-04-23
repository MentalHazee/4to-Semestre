import type { Ingrediente } from "../../types/ingrediente.types";
import { Edit2, Trash2, ShieldAlert, Info } from "lucide-react";

interface Props {
  data: Ingrediente[];
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: number) => void;
}

const IngredienteTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
      <table className="w-full text-left">
        <thead className="bg-zinc-900/50 border-b border-zinc-800">
          <tr>
            <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Ingrediente</th>
            <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Alérgeno</th>
            <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {data.map((ingrediente) => (
            <tr key={ingrediente.id} className="group hover:bg-zinc-800/30 transition-colors">
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-200">{ingrediente.nombre}</span>
                  {ingrediente.descripcion && (
                    <span className="text-xs text-zinc-500 line-clamp-1">{ingrediente.descripcion}</span>
                  )}
                </div>
              </td>
              <td className="p-4 text-center">
                {ingrediente.es_alergeno ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/30 text-amber-500 border border-amber-500/20">
                    <ShieldAlert size={12} /> SÍ
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-500">
                    No
                  </span>
                )}
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(ingrediente)}
                    className="p-2 rounded-lg bg-zinc-800 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(ingrediente.id)}
                    className="p-2 rounded-lg bg-zinc-800 text-red-400 hover:bg-red-500 hover:text-white transition-all"
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
              <td colSpan={3} className="p-8 text-center text-zinc-500 italic">
                No hay ingredientes cargados todavía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IngredienteTable;