import type { Categoria } from "../../types/categoria.types";
import { Edit2, Trash2, FolderTree, ImageIcon } from "lucide-react";

interface Props {
  data: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

const CategoriaTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-red/20 bg-zinc-950/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-brand-red/10 border-b border-brand-red/20">
          <tr>
            <th className="p-4 text-xs font-black text-brand-red uppercase tracking-widest">Categoría</th>
            <th className="p-4 text-xs font-black text-brand-red uppercase tracking-widest">Superior</th>
            <th className="p-4 text-xs font-black text-brand-red uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-red/10">
          {data.map((categoria) => (
            <tr key={categoria.id} className="group hover:bg-brand-red/5 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {categoria.imagen_url ? (
                    <img src={categoria.imagen_url} alt={categoria.nombre} className="w-12 h-12 rounded-lg object-cover border border-brand-red/20" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                      <ImageIcon size={20} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-black text-white text-lg uppercase tracking-tight leading-none mb-1">{categoria.nombre}</span>
                    <span className="text-xs text-zinc-400 line-clamp-1">{categoria.descripcion || "Sin descripción"}</span>
                  </div>
                </div>
              </td>
              <td className="p-4">
                {categoria.parent_id ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-brand-red/20 text-brand-red border border-brand-red/20 uppercase">
                    <FolderTree size={10} /> Padre ID: {categoria.parent_id}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-600">—</span>
                )}
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(categoria)}
                    className="p-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 hover:bg-brand-red hover:border-brand-red transition-all shadow-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(categoria.id)}
                    className="p-2 rounded-lg bg-brand-red/20 text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaTable;