import { useState } from "react";
import type { Categoria, CategoriaCreate } from "../../types/categoria.types";
import { useCategorias } from "../../hooks/useCategorias";
import { FolderTree, Image as ImageIcon, Type } from "lucide-react";

interface Props {
  initialData?: Categoria | null;
  onSubmit: (data: CategoriaCreate) => void;
}

const CategoriaForm = ({ initialData, onSubmit }: Props) => {
  const { data: categorias } = useCategorias();

  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");
  const [imagenUrl, setImagenUrl] = useState(initialData?.imagen_url || "");
  const [parentId, setParentId] = useState<number | null>(initialData?.parent_id || null);
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
      imagen_url: imagenUrl,
      parent_id: parentId === 0 ? null : parentId,
    });
  };

  // Filtrar para que una categoría no pueda ser su propia madre
  const availableParents = categorias?.filter(c => c.id !== initialData?.id) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-zinc-200">
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
          <Type size={14} /> Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
          placeholder="Ej: Pizzas, Bebidas..."
        />
        {error && <p className="text-red-500 text-xs mt-1 font-bold">{error}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-500">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none h-20"
          placeholder="¿De qué trata esta categoría?"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
          <ImageIcon size={14} /> URL Imagen
        </label>
        <input
          type="text"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none"
          placeholder="https://..."
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
          <FolderTree size={14} /> Categoría Superior (Opcional)
        </label>
        <select
          value={parentId || 0}
          onChange={(e) => setParentId(Number(e.target.value) || null)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:ring-2 focus:ring-red-600 outline-none appearance-none"
        >
          <option value={0}>Ninguna (Categoría Raíz)</option>
          {availableParents.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <button className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-red-900/40 active:scale-[0.98] mt-4">
        {initialData ? "ACTUALIZAR" : "CREAR CATEGORÍA"}
      </button>
    </form>
  );
};

export default CategoriaForm;