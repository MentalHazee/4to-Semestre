import type { Categoria } from "../../types/categoria.types";
import { Edit2, Trash2, FolderTree, ImageIcon } from "lucide-react";

interface Props {
  data: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

const CategoriaTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
      <table className="w-full text-left">
        <thead className="bg-zinc-900/50 border-b border-zinc-800">
          <tr>
            <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Categoría</th>
            <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Superior</th>
            <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {data.map((categoria) => (
            <tr key={categoria.id} className="group hover:bg-zinc-800/30 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {categoria.imagen_url ? (
                    <img src={categoria.imagen_url} alt={categoria.nombre} className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600">
                      <ImageIcon size={20} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-200">{categoria.nombre}</span>
                    <span className="text-xs text-zinc-500 line-clamp-1">{categoria.descripcion || "Sin descripción"}</span>
                  </div>
                </div>
              </td>
              <td className="p-4">
                {categoria.parent_id ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-950/30 text-blue-400 border border-blue-500/20">
                    <FolderTree size={12} /> ID: {categoria.parent_id}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-600">—</span>
                )}
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(categoria)}
                    className="p-2 rounded-lg bg-zinc-800 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(categoria.id)}
                    className="p-2 rounded-lg bg-zinc-800 text-red-400 hover:bg-red-500 hover:text-white transition-all"
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